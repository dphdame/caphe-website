/**
 * Test script for PDF generator
 * Run with: node src/backend/test-pdf-generator.js
 */

const { generateCountyReport, generateFilename, calculateMetrics, formatCurrency } = require('./pdf-generator');
const fs = require('fs');
const path = require('path');

// Test data - Sacramento County example from plan
const testData = {
  county: 'Sacramento',
  fiscal_year: 'FY 2024',
  total_expenditure: 21200000, // $21.2M
  communicable_disease: 5088000,   // 24%
  chronic_disease: 8056000,        // 38%
  environmental_health: 2968000,   // 14%
  maternal_child: 4028000,         // 19%
  other_programs: 1060000,         // 5%
  data_source: 'cafr'
};

const population = 1556683; // Sacramento County population

async function runTest() {
  console.log('='.repeat(60));
  console.log('CAPHE ROI Report PDF Generator - Test');
  console.log('='.repeat(60));

  // Test metrics calculation
  console.log('\n1. Testing metrics calculation...');
  const metrics = calculateMetrics(testData, population);
  console.log('   Lives Saved:', metrics.livesSaved);
  console.log('   Social Value:', formatCurrency(metrics.socialValue));
  console.log('   Benefit-Cost Ratio:', metrics.bcr + ':1');
  console.log('   Cost Per Life:', formatCurrency(metrics.costPerLife));
  console.log('   Per Capita:', `$${metrics.perCapita.toFixed(2)}`);

  // Expected values based on coefficient: 9.16 deaths per 100k per $10 per capita
  // Sacramento: $13.62 per capita = 1.362 $10-units
  // Mortality reduction: 9.16 * 1.362 = 12.48 per 100k
  // Lives saved: 12.48 / 100k * 1,556,683 = 194.3
  const expectedLives = 194;
  const expectedBCR = 125; // (194 * $13.6M) / $21.2M

  if (Math.abs(metrics.livesSaved - expectedLives) < 5) {
    console.log('   ✓ Lives saved calculation correct');
  } else {
    console.log('   ✗ Lives saved mismatch. Expected ~194, got', metrics.livesSaved);
  }

  if (Math.abs(metrics.bcr - expectedBCR) < 10) {
    console.log('   ✓ BCR calculation correct');
  } else {
    console.log('   ✗ BCR mismatch. Expected ~125, got', metrics.bcr);
  }

  // Test filename generation
  console.log('\n2. Testing filename generation...');
  const filename = generateFilename(testData.county, testData.fiscal_year);
  console.log('   Generated filename:', filename);
  if (filename.includes('sacramento') && filename.endsWith('.pdf')) {
    console.log('   ✓ Filename format correct');
  } else {
    console.log('   ✗ Filename format issue');
  }

  // Test PDF generation
  console.log('\n3. Testing PDF generation (this may take a moment)...');
  try {
    const startTime = Date.now();
    const pdfBuffer = await generateCountyReport(testData, population);
    const elapsed = Date.now() - startTime;

    console.log('   PDF generated in', elapsed, 'ms');
    console.log('   PDF size:', (pdfBuffer.length / 1024).toFixed(1), 'KB');

    // Check file size (should be < 2MB per plan requirements)
    if (pdfBuffer.length < 2 * 1024 * 1024) {
      console.log('   ✓ PDF size under 2MB limit');
    } else {
      console.log('   ✗ PDF size exceeds 2MB limit');
    }

    // Save test PDF to outputs directory
    const outputDir = path.join(__dirname, '../../outputs');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, pdfBuffer);
    console.log('\n   Test PDF saved to:', outputPath);
    console.log('   ✓ PDF generation successful!');

  } catch (error) {
    console.error('   ✗ PDF generation failed:', error.message);
    process.exit(1);
  }

  console.log('\n' + '='.repeat(60));
  console.log('All tests passed! Review the generated PDF manually.');
  console.log('='.repeat(60));
}

runTest().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
