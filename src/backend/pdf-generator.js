/**
 * PDF Generator Service for CAPHE County ROI Reports
 *
 * Generates ADA-accessible PDF reports using puppeteer
 * Template: Option B (Full Analysis - 2-3 pages)
 *
 * ADA Compliance Features:
 * - Tagged PDF structure
 * - Alt text for charts via data tables
 * - Color contrast ≥4.5:1
 * - Minimum 12pt font
 * - Logical reading order
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

/**
 * Format currency for display
 * @param {number} amount - Amount in dollars
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
  if (amount >= 1e9) {
    return `$${(amount / 1e9).toFixed(1)}B`;
  } else if (amount >= 1e6) {
    return `$${(amount / 1e6).toFixed(1)}M`;
  } else if (amount >= 1e3) {
    return `$${(amount / 1e3).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
  return num.toLocaleString('en-US', { maximumFractionDigits: 1 });
}

/**
 * Calculate ROI metrics from submission data
 * @param {Object} data - Submission data
 * @param {number} population - County population
 * @returns {Object} Calculated metrics
 */
function calculateMetrics(data, population) {
  // Cholette, Patton & Zarate-Gomez (2026) Lewbel IV coefficient
  // Coefficient is -9.16 deaths per 100,000 per $10 per capita (= -0.916 per $1)
  const COEFFICIENT = 9.16; // deaths per 100,000 per $10 per capita
  const VSL = 13600000; // HHS Value of Statistical Life (2025)

  const totalExpenditure = data.total_expenditure || 0;
  const perCapita = totalExpenditure / population;
  const perCapitaUnits = perCapita / 10; // Convert to $10 units

  // Calculate lives saved
  const mortalityReduction = COEFFICIENT * perCapitaUnits;
  const livesSaved = (mortalityReduction / 100000) * population;

  // Calculate economic value
  const socialValue = livesSaved * VSL;
  const bcr = totalExpenditure > 0 ? socialValue / totalExpenditure : 0;
  const costPerLife = livesSaved > 0 ? totalExpenditure / livesSaved : 0;

  return {
    livesSaved: Math.round(livesSaved * 10) / 10,
    socialValue: socialValue,
    bcr: Math.round(bcr),
    costPerLife: costPerLife,
    perCapita: perCapita,
    mortalityReduction: mortalityReduction
  };
}

/**
 * Calculate spending percentages
 * @param {Object} data - Submission data with spending categories
 * @returns {Object} Percentages for each category
 */
function calculateSpendingPercentages(data) {
  const total = data.total_expenditure || 1;

  const chronic = data.chronic_disease || 0;
  const communicable = data.communicable_disease || 0;
  const maternal = data.maternal_child || 0;
  const environmental = data.environmental_health || 0;
  const other = data.other_programs || 0;

  return {
    chronicPercent: Math.round((chronic / total) * 100),
    communicablePercent: Math.round((communicable / total) * 100),
    maternalPercent: Math.round((maternal / total) * 100),
    environmentalPercent: Math.round((environmental / total) * 100),
    otherPercent: Math.round((other / total) * 100),
    chronicAmount: formatCurrency(chronic),
    communicableAmount: formatCurrency(communicable),
    maternalAmount: formatCurrency(maternal),
    environmentalAmount: formatCurrency(environmental),
    otherAmount: formatCurrency(other)
  };
}

/**
 * Generate HTML content from template
 * @param {Object} data - Submission data
 * @param {number} population - County population
 * @returns {string} Rendered HTML
 */
function renderTemplate(data, population) {
  const templatePath = path.join(__dirname, 'report-templates', 'report-full.html');
  const cssPath = path.join(__dirname, 'report-templates', 'report-styles.css');

  let html = fs.readFileSync(templatePath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');

  // Calculate metrics
  const metrics = calculateMetrics(data, population);
  const spending = calculateSpendingPercentages(data);

  // Prepare data source display
  let dataSourceDisplay = 'Self-reported by county official';
  if (data.data_source) {
    const sourceMap = {
      'cafr': 'Comprehensive Annual Financial Report (CAFR)',
      'budget': 'Adopted Budget Document',
      'internal': 'Internal Financial Systems',
      'scf': 'State Controller\'s Office Report'
    };
    dataSourceDisplay = sourceMap[data.data_source] || data.data_source;
  }

  // Replace placeholders
  const replacements = {
    // Header
    '{{county}}': data.county || 'Unknown County',
    '{{fiscalYear}}': data.fiscal_year || 'FY 2024',
    '{{logoPath}}': getLogoBase64(),

    // Key Findings
    '{{livesSaved}}': formatNumber(metrics.livesSaved),
    '{{bcr}}': formatNumber(metrics.bcr),
    '{{socialValue}}': formatCurrency(metrics.socialValue),
    '{{costPerLife}}': formatCurrency(metrics.costPerLife),

    // Investment Summary
    '{{totalExpenditure}}': formatCurrency(data.total_expenditure || 0),
    '{{perCapita}}': `$${metrics.perCapita.toFixed(2)}`,
    '{{population}}': formatNumber(population),

    // Spending Breakdown
    '{{chronicPercent}}': spending.chronicPercent,
    '{{communicablePercent}}': spending.communicablePercent,
    '{{maternalPercent}}': spending.maternalPercent,
    '{{environmentalPercent}}': spending.environmentalPercent,
    '{{otherPercent}}': spending.otherPercent,
    '{{chronicAmount}}': spending.chronicAmount,
    '{{communicableAmount}}': spending.communicableAmount,
    '{{maternalAmount}}': spending.maternalAmount,
    '{{environmentalAmount}}': spending.environmentalAmount,
    '{{otherAmount}}': spending.otherAmount,

    // Methodology
    '{{dataSource}}': dataSourceDisplay,

    // Footer
    '{{generatedDate}}': new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };

  // Apply replacements
  for (const [placeholder, value] of Object.entries(replacements)) {
    html = html.split(placeholder).join(value);
  }

  // Inline the CSS
  html = html.replace(
    '<link rel="stylesheet" href="report-styles.css">',
    `<style>${css}</style>`
  );

  return html;
}

/**
 * Get CAPHE logo as base64 PNG
 * @returns {string} Base64 encoded PNG with data URI prefix
 */
function getLogoBase64() {
  const logoPath = path.join(__dirname, '../../assets/images/logo.png');

  try {
    const logoBuffer = fs.readFileSync(logoPath);
    return 'data:image/png;base64,' + logoBuffer.toString('base64');
  } catch (error) {
    console.warn('Could not load CAPHE logo, using fallback');
    // Fallback to simple SVG if logo file not found
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60">
        <rect width="200" height="60" fill="#ffffff"/>
        <text x="10" y="38" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#0041A5">CAPHE</text>
        <text x="10" y="52" font-family="Arial, sans-serif" font-size="8" fill="#333333">California Association of Public Health Economists</text>
      </svg>
    `;
    return 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');
  }
}

/**
 * Generate PDF report for county ROI analysis
 * @param {Object} submissionData - LHA submission data
 * @param {number} population - County population
 * @returns {Promise<Buffer>} PDF file buffer
 */
async function generateCountyReport(submissionData, population) {
  let browser = null;

  try {
    // Render HTML template
    const html = renderTemplate(submissionData, population);

    // Launch puppeteer with appropriate args for server environment
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();

    // Set content
    await page.setContent(html, {
      waitUntil: 'networkidle0'
    });

    // Generate PDF with accessibility features
    const pdfBuffer = await page.pdf({
      format: 'Letter',
      margin: {
        top: '0.75in',
        right: '0.75in',
        bottom: '0.75in',
        left: '0.75in'
      },
      printBackground: true,
      displayHeaderFooter: false,
      preferCSSPageSize: true,
      tagged: true // Enable tagged PDF for accessibility
    });

    return pdfBuffer;

  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Generate filename for the PDF report
 * @param {string} county - County name
 * @param {string} fiscalYear - Fiscal year
 * @returns {string} Safe filename
 */
function generateFilename(county, fiscalYear) {
  const safeCounty = (county || 'Unknown')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase();

  const safeFY = (fiscalYear || 'FY2024')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();

  return `caphe_roi_report_${safeCounty}_${safeFY}.pdf`;
}

module.exports = {
  generateCountyReport,
  generateFilename,
  calculateMetrics,
  formatCurrency
};
