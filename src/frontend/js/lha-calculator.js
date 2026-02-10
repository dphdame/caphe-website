/**
 * CAPHE Website - LHA Public Health ROI Calculator
 * Handles quick estimates and detailed submissions for Local Health Authorities
 */

// California counties list
const CALIFORNIA_COUNTIES = [
  'Alameda', 'Alpine', 'Amador', 'Butte', 'Calaveras', 'Colusa', 'Contra Costa',
  'Del Norte', 'El Dorado', 'Fresno', 'Glenn', 'Humboldt', 'Imperial', 'Inyo',
  'Kern', 'Kings', 'Lake', 'Lassen', 'Los Angeles', 'Madera', 'Marin', 'Mariposa',
  'Mendocino', 'Merced', 'Modoc', 'Mono', 'Monterey', 'Napa', 'Nevada', 'Orange',
  'Placer', 'Plumas', 'Riverside', 'Sacramento', 'San Benito', 'San Bernardino',
  'San Diego', 'San Francisco', 'San Joaquin', 'San Luis Obispo', 'San Mateo',
  'Santa Barbara', 'Santa Clara', 'Santa Cruz', 'Shasta', 'Sierra', 'Siskiyou',
  'Solano', 'Sonoma', 'Stanislaus', 'Sutter', 'Tehama', 'Trinity', 'Tulare',
  'Tuolumne', 'Ventura', 'Yolo', 'Yuba'
];

// County population data (for per-capita calculations)
const COUNTY_POPULATIONS = {
  'Alameda': 1682353, 'Alpine': 1204, 'Amador': 41259, 'Butte': 211632,
  'Calaveras': 46221, 'Colusa': 22280, 'Contra Costa': 1165927, 'Del Norte': 27743,
  'El Dorado': 193221, 'Fresno': 1013581, 'Glenn': 29316, 'Humboldt': 136463,
  'Imperial': 179851, 'Inyo': 18584, 'Kern': 909235, 'Kings': 153443,
  'Lake': 68766, 'Lassen': 33159, 'Los Angeles': 9721138, 'Madera': 160089,
  'Marin': 262321, 'Mariposa': 17131, 'Mendocino': 91305, 'Merced': 286461,
  'Modoc': 8700, 'Mono': 13247, 'Monterey': 439035, 'Napa': 138019,
  'Nevada': 103487, 'Orange': 3186989, 'Placer': 412300, 'Plumas': 19790,
  'Riverside': 2470546, 'Sacramento': 1585055, 'San Benito': 66677,
  'San Bernardino': 2194710, 'San Diego': 3298634, 'San Francisco': 808437,
  'San Joaquin': 789410, 'San Luis Obispo': 283111, 'San Mateo': 764442,
  'Santa Barbara': 448229, 'Santa Clara': 1936259, 'Santa Cruz': 270861,
  'Shasta': 182155, 'Sierra': 3236, 'Siskiyou': 44076, 'Solano': 451716,
  'Sonoma': 488863, 'Stanislaus': 552999, 'Sutter': 99063, 'Tehama': 65829,
  'Trinity': 16060, 'Tulare': 477054, 'Tuolumne': 55810, 'Ventura': 839784,
  'Yolo': 216403, 'Yuba': 81575
};

// Model parameters from Cholette, Patton & Zarate-Gomez (2026)
// Lewbel IV estimate: -9.16 deaths per 100,000 per $10 per capita
// Equivalent: -0.916 deaths per 100,000 per $1 per capita
const MODEL = {
  coefficient: -0.916,       // Deaths per 100,000 per $1 per capita
  vsl: 13600000,            // Value of Statistical Life ($13.6M, HHS 2025)
  costPerLife: 109000       // Approximate cost per life saved
};

// Known California county health department email domains
const KNOWN_COUNTY_DOMAINS = [
  // Large counties
  'acgov.org',           // Alameda
  'lacounty.gov',        // Los Angeles
  'ocgov.com',           // Orange
  'ochca.com',           // Orange Health Care Agency
  'rivco.org',           // Riverside
  'sbcounty.gov',        // San Bernardino
  'sdcounty.ca.gov',     // San Diego
  'sfdph.org',           // San Francisco
  'sfgov.org',           // San Francisco (general)
  'sccgov.org',          // Santa Clara
  'saccounty.net',       // Sacramento
  'saccounty.gov',       // Sacramento (alternate)

  // Medium counties
  'acphs.org',           // Alameda County Public Health
  'cchealth.org',        // Contra Costa
  'co.fresno.ca.us',     // Fresno
  'fresnocountyca.gov',  // Fresno (alternate)
  'kerncounty.com',      // Kern
  'co.kern.ca.us',       // Kern (alternate)
  'co.monterey.ca.us',   // Monterey
  'placer.ca.gov',       // Placer
  'smcgov.org',          // San Mateo
  'sjgov.org',           // San Joaquin
  'santacruzhealth.org', // Santa Cruz
  'sbcphd.org',          // Santa Barbara
  'countyofsb.org',      // Santa Barbara (general)
  'solanocounty.com',    // Solano
  'sonoma-county.org',   // Sonoma
  'stancounty.com',      // Stanislaus
  'tularehhsa.org',      // Tulare
  'tularecounty.ca.gov', // Tulare (alternate)
  'ventura.org',         // Ventura
  'vchca.org',           // Ventura County Health
  'yolocounty.org',      // Yolo

  // Smaller counties
  'alpinecountyca.gov',  // Alpine
  'amadorgov.org',       // Amador
  'co.butte.ca.us',      // Butte
  'buttecounty.net',     // Butte (alternate)
  'co.calaveras.ca.us',  // Calaveras
  'countyofcolusa.org',  // Colusa
  'co.del-norte.ca.us',  // Del Norte
  'edcgov.us',           // El Dorado
  'co.glenn.ca.us',      // Glenn
  'co.humboldt.ca.us',   // Humboldt
  'humboldtgov.org',     // Humboldt (alternate)
  'co.imperial.ca.us',   // Imperial
  'inyocounty.us',       // Inyo
  'co.kings.ca.us',      // Kings
  'co.lake.ca.us',       // Lake
  'co.lassen.ca.us',     // Lassen
  'maderacounty.com',    // Madera
  'marincounty.org',     // Marin
  'mariposacounty.org',  // Mariposa
  'co.mendocino.ca.us',  // Mendocino
  'countyofmerced.com',  // Merced
  'co.modoc.ca.us',      // Modoc
  'monocounty.ca.gov',   // Mono
  'napacounty.org',      // Napa
  'countyofnapa.org',    // Napa (alternate)
  'mynevadacounty.com',  // Nevada
  'co.plumas.ca.us',     // Plumas
  'cosb.us',             // San Benito
  'countyofshasta.org',  // Shasta
  'sierracounty.ca.gov', // Sierra
  'co.siskiyou.ca.us',   // Siskiyou
  'co.sutter.ca.us',     // Sutter
  'co.tehama.ca.us',     // Tehama
  'trinitycounty.org',   // Trinity
  'co.tuolumne.ca.us',   // Tuolumne
  'yubacounty.org'       // Yuba
];

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initQuickCalculator();
  initDetailedForm();
  initFileUpload();
  populateCountyDropdown();
  initCurrencyFormatting();
  initEmailValidation();
  initRightColumnState();
  initResearchToggle();
});

// Toggle research details visibility
function initResearchToggle() {
  const toggleBtn = document.getElementById('research-toggle');
  const detailsDiv = document.getElementById('research-details');

  if (toggleBtn && detailsDiv) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isHidden = detailsDiv.style.display === 'none';
      detailsDiv.style.display = isHidden ? 'block' : 'none';
      toggleBtn.textContent = isHidden ? 'Hide details' : 'Learn more';
    });
  }
}

// ============ Right Column State Management ============
// Single source of truth for right column visibility
// Prevents bugs where elements from other tabs leak through

function setRightColumnState(activeTab, hasResults = false) {
  const quickExplainer = document.getElementById('quick-explainer');
  const quickResults = document.getElementById('quick-results');
  const detailedUpload = document.getElementById('detailed-upload-column');
  const detailedResults = document.getElementById('detailed-results');

  // Hide everything first
  if (quickExplainer) quickExplainer.style.display = 'none';
  if (quickResults) quickResults.classList.remove('show');
  if (detailedUpload) detailedUpload.style.display = 'none';
  if (detailedResults) detailedResults.classList.remove('show');

  // Then show only what's needed for current state
  if (activeTab === 'quick') {
    if (hasResults) {
      if (quickResults) quickResults.classList.add('show');
    } else {
      if (quickExplainer) quickExplainer.style.display = 'block';
    }
  } else if (activeTab === 'detailed') {
    if (hasResults) {
      if (detailedResults) detailedResults.classList.add('show');
    } else {
      if (detailedUpload) detailedUpload.style.display = 'block';
    }
  }
}

// Initialize right column on page load
function initRightColumnState() {
  // On initial load, Quick Estimate tab is active, no results yet
  setRightColumnState('quick', false);
}

// ============ Currency Input Formatting ============

function initCurrencyFormatting() {
  // Quick spending with live preview
  const quickSpending = document.getElementById('quick-spending');
  const quickPreview = document.getElementById('quick-spending-preview');

  if (quickSpending && quickPreview) {
    quickSpending.addEventListener('input', () => {
      const value = parseFloat(quickSpending.value);
      if (!isNaN(value) && value > 0) {
        // Input is in thousands, multiply by 1000 for display
        quickPreview.textContent = '= ' + formatCurrency(value * 1000);
        quickPreview.style.display = 'block';
      } else {
        quickPreview.style.display = 'none';
      }
    });
  }

  // Detailed form spending inputs - update total on input
  const spendingInputs = document.querySelectorAll('.spending-input');
  spendingInputs.forEach(input => {
    input.addEventListener('input', updateCalculatedTotal);
  });
}

function getRawValue(input) {
  // Get raw numeric value from input
  const value = input.value.replace(/,/g, '');
  return parseFloat(value) || 0;
}

// ============ Email Validation ============

function initEmailValidation() {
  const emailInput = document.getElementById('detail-email');
  const validationMsg = document.getElementById('email-validation-msg');

  if (!emailInput || !validationMsg) return;

  emailInput.addEventListener('blur', () => {
    const email = emailInput.value.trim().toLowerCase();
    if (!email) {
      validationMsg.style.display = 'none';
      emailInput.classList.remove('error');
      return;
    }

    const validation = validateEmailDomain(email);

    if (validation.trusted) {
      validationMsg.className = 'email-validation-msg trusted';
      validationMsg.innerHTML = `<span aria-hidden="true">✓</span> ${validation.message}`;
      validationMsg.style.display = 'block';
      emailInput.classList.remove('error');
      emailInput.dataset.emailValid = 'true';
    } else if (validation.blocked) {
      validationMsg.className = 'email-validation-msg blocked';
      validationMsg.innerHTML = `<span aria-hidden="true">⚠</span> ${validation.message}`;
      validationMsg.style.display = 'block';
      emailInput.classList.add('error');
      emailInput.dataset.emailValid = 'false';
    } else {
      validationMsg.style.display = 'none';
      emailInput.classList.remove('error');
    }
  });

  emailInput.addEventListener('focus', () => {
    validationMsg.style.display = 'none';
  });
}

function validateEmailDomain(email) {
  const domain = email.split('@')[1];
  if (!domain) return { trusted: false, warning: false };

  // Check for .gov domains (federal, state, local)
  if (domain.endsWith('.gov') || domain.endsWith('.ca.gov')) {
    return {
      trusted: true,
      message: 'Government email verified'
    };
  }

  // Check for .edu domains
  if (domain.endsWith('.edu')) {
    return {
      trusted: true,
      message: 'Academic email verified'
    };
  }

  // Check for known California county domains
  if (KNOWN_COUNTY_DOMAINS.some(d => domain === d || domain.endsWith('.' + d))) {
    return {
      trusted: true,
      message: 'County email verified'
    };
  }

  // Check for .ca.us domains (California local government)
  if (domain.endsWith('.ca.us')) {
    return {
      trusted: true,
      message: 'California government email verified'
    };
  }

  // Block personal emails - require institutional email
  return {
    trusted: false,
    blocked: true,
    message: 'Please use a government (.gov), academic (.edu), or official county email address to ensure data validity.'
  };
}

// ============ Tab Navigation ============

function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach((btn, index) => {
    // Click handler
    btn.addEventListener('click', () => {
      activateTab(btn, tabBtns, tabContents);
    });

    // Keyboard navigation (Left/Right arrows)
    btn.addEventListener('keydown', (e) => {
      let targetIndex;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        targetIndex = (index + 1) % tabBtns.length;
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        targetIndex = (index - 1 + tabBtns.length) % tabBtns.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        targetIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        targetIndex = tabBtns.length - 1;
      }

      if (targetIndex !== undefined) {
        tabBtns[targetIndex].focus();
        activateTab(tabBtns[targetIndex], tabBtns, tabContents);
      }
    });
  });
}

function activateTab(btn, tabBtns, tabContents) {
  const tabId = btn.dataset.tab;

  // Update ARIA states and classes
  tabBtns.forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
    b.setAttribute('tabindex', '-1');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
  btn.setAttribute('tabindex', '0');

  // Update content panels
  tabContents.forEach(content => {
    content.classList.remove('active');
    if (content.id === `tab-${tabId}`) {
      content.classList.add('active');
    }
  });

  // Update right column - use single source of truth
  // When switching tabs, always show the "no results" state for that tab
  setRightColumnState(tabId, false);

  // Focus management: move focus to first input in the active tab
  setTimeout(() => {
    const activePanel = document.getElementById(`tab-${tabId}`);
    if (activePanel) {
      const firstInput = activePanel.querySelector('input:not([type="hidden"]):not([type="file"]), select');
      if (firstInput) firstInput.focus();
    }
  }, 100);
}

// ============ Inline Error Handling ============

function showError(inputId, message) {
  const input = document.getElementById(inputId);
  if (!input) return;

  clearError(inputId);

  const errorId = `${inputId}-error`;
  const errorDiv = document.createElement('div');
  errorDiv.id = errorId;
  errorDiv.className = 'form-error';
  errorDiv.setAttribute('role', 'alert');
  errorDiv.innerHTML = `<span aria-hidden="true">⚠</span> ${message}`;

  input.classList.add('error');
  input.setAttribute('aria-invalid', 'true');
  input.setAttribute('aria-describedby', errorId);
  input.parentNode.appendChild(errorDiv);
}

function clearError(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const errorId = `${inputId}-error`;
  const existingError = document.getElementById(errorId);
  if (existingError) existingError.remove();

  input.classList.remove('error');
  input.removeAttribute('aria-invalid');
  // Keep aria-describedby for help text if it exists
  const helpText = input.parentNode.querySelector('.field-help');
  if (helpText) {
    input.setAttribute('aria-describedby', helpText.id);
  } else {
    input.removeAttribute('aria-describedby');
  }
}

function clearAllErrors(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.querySelectorAll('.form-error').forEach(el => el.remove());
  form.querySelectorAll('.error').forEach(el => {
    el.classList.remove('error');
    el.removeAttribute('aria-invalid');
  });
}

// ============ Quick Calculator ============

function initQuickCalculator() {
  const form = document.getElementById('quick-form');
  const countyInput = document.getElementById('quick-county');
  const suggestionsDiv = document.getElementById('quick-county-suggestions');

  // County autocomplete
  let selectedCounty = null;

  countyInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    selectedCounty = null;

    if (query.length < 2) {
      suggestionsDiv.innerHTML = '';
      suggestionsDiv.style.display = 'none';
      return;
    }

    const matches = CALIFORNIA_COUNTIES.filter(c =>
      c.toLowerCase().includes(query)
    ).slice(0, 5);

    if (matches.length > 0) {
      suggestionsDiv.innerHTML = matches.map(county =>
        `<div class="suggestion-item" data-county="${county}">${county} County</div>`
      ).join('');
      suggestionsDiv.style.display = 'block';

      // Add click handlers
      suggestionsDiv.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
          selectedCounty = item.dataset.county;
          countyInput.value = `${selectedCounty} County`;
          suggestionsDiv.style.display = 'none';
        });
      });
    } else {
      suggestionsDiv.innerHTML = '<div class="suggestion-item" style="color: var(--color-text-muted);">No matching counties</div>';
      suggestionsDiv.style.display = 'block';
    }
  });

  // Hide suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!countyInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
      suggestionsDiv.style.display = 'none';
    }
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors('quick-form');

    // Validate county selection
    if (!selectedCounty) {
      // Try to match input to county
      const inputVal = countyInput.value.toLowerCase().replace(' county', '');
      const match = CALIFORNIA_COUNTIES.find(c => c.toLowerCase() === inputVal);
      if (match) {
        selectedCounty = match;
      } else {
        showError('quick-county', 'Please select a valid California county');
        countyInput.focus();
        return;
      }
    }

    const spendingInput = document.getElementById('quick-spending');
    const spendingThousands = getRawValue(spendingInput);
    if (!spendingThousands || spendingThousands <= 0) {
      showError('quick-spending', 'Please enter a valid spending amount greater than zero');
      spendingInput.focus();
      return;
    }

    // Convert from thousands to actual dollars
    const spending = spendingThousands * 1000;
    calculateQuickROI(selectedCounty, spending);
  });
}

function calculateQuickROI(county, spending) {
  const population = COUNTY_POPULATIONS[county] || 500000;
  const perCapita = spending / population;

  // Calculate mortality reduction
  // Coefficient is deaths per 100,000 per $1 per capita (0.916)
  const mortalityReduction = Math.abs(MODEL.coefficient) * perCapita;
  const livesSaved = (mortalityReduction / 100000) * population;

  // Calculate value
  const socialValue = livesSaved * MODEL.vsl;
  const costPerLife = spending / livesSaved;
  const bcr = socialValue / spending;

  // Set right column to show quick results
  setRightColumnState('quick', true);

  // Display results
  document.getElementById('result-county-name').textContent = `${county} County`;
  document.getElementById('result-spending-display').textContent = formatCurrency(spending);
  document.getElementById('result-lives').textContent = livesSaved.toFixed(1);
  document.getElementById('result-cost-per-life').textContent = formatCurrency(costPerLife);
  document.getElementById('result-bcr').textContent = `${bcr.toFixed(0)}:1`;
  document.getElementById('result-social-value').textContent = formatCurrencyShort(socialValue);

}

// ============ Detailed Form ============

function initDetailedForm() {
  const form = document.getElementById('detailed-form');

  // Form submission
  form.addEventListener('submit', handleDetailedSubmit);
}

function updateCalculatedTotal() {
  const inputs = document.querySelectorAll('.spending-input');
  let totalThousands = 0;

  inputs.forEach(input => {
    const val = getRawValue(input);
    totalThousands += val;
  });

  // Display in actual dollars (multiply by 1000)
  document.getElementById('calculated-total').textContent = formatCurrency(totalThousands * 1000);
}

async function handleDetailedSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const statusDiv = document.getElementById('detailed-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Build form data
  let formData = {
    county: form.county.value,
    data_source: form.data_source.value,
    name: form.name.value,
    title: form.title.value,
    email: form.email.value,
    research_consent: form.research_consent.checked,
    newsletter_consent: form.newsletter_consent ? form.newsletter_consent.checked : false
  };

  // File upload required - data should be in uploadedData
  if (!window.uploadedData) {
    statusDiv.innerHTML = '<p style="color: var(--color-error);">Please upload a spending data file</p>';
    statusDiv.classList.remove('hidden');
    return;
  }
  Object.assign(formData, window.uploadedData);

  // Validation
  if (!formData.county) {
    statusDiv.innerHTML = '<p style="color: var(--color-error);">Please select a county</p>';
    statusDiv.classList.remove('hidden');
    return;
  }

  if (!formData.data_source) {
    statusDiv.innerHTML = '<p style="color: var(--color-error);">Please select a data source</p>';
    statusDiv.classList.remove('hidden');
    return;
  }

  // Validate email domain
  const emailValidation = validateEmailDomain(formData.email.toLowerCase());
  if (emailValidation.blocked) {
    statusDiv.innerHTML = '<p style="color: var(--color-error);">Please use a government (.gov), academic (.edu), or official county email address</p>';
    statusDiv.classList.remove('hidden');
    document.getElementById('detail-email').focus();
    return;
  }

  if (formData.total_expenditure <= 0) {
    statusDiv.innerHTML = '<p style="color: var(--color-error);">Total expenditure must be greater than zero</p>';
    statusDiv.classList.remove('hidden');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Generating Report...';
  statusDiv.classList.add('hidden');

  try {
    const response = await fetch('/api/lha/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      displayDetailedResults(formData, result);
      statusDiv.innerHTML = `<p style="color: var(--color-success);">✓ Report generated! ${result.research_consent ? 'Thank you for participating in our research.' : ''}</p>`;
      statusDiv.classList.remove('hidden');
    } else {
      throw new Error(result.error || 'Failed to generate report');
    }
  } catch (error) {
    statusDiv.innerHTML = `<p style="color: var(--color-error);">Error: ${error.message}</p>`;
    statusDiv.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Generate My Report';
  }
}

function displayDetailedResults(formData, result) {
  // Set right column to show detailed results
  setRightColumnState('detailed', true);

  const resultsDiv = document.getElementById('detailed-results');
  const population = COUNTY_POPULATIONS[formData.county] || 500000;
  const perCapita = formData.total_expenditure / population;
  const mortalityReduction = Math.abs(MODEL.coefficient) * perCapita;
  const livesSaved = (mortalityReduction / 100000) * population;
  const socialValue = livesSaved * MODEL.vsl;
  const costPerLife = formData.total_expenditure / livesSaved;
  const bcr = socialValue / formData.total_expenditure;

  const yearDisplay = formData.fiscal_year ? ` (FY ${formData.fiscal_year})` : '';
  resultsDiv.innerHTML = `
    <div class="results-header">
      <h3>ROI Analysis: ${formData.county} County${yearDisplay}</h3>
      <p>Based on ${formatCurrency(formData.total_expenditure)} in public health spending</p>
    </div>

    <div class="result-cards">
      <div class="result-card">
        <div class="label">Per Capita Spending</div>
        <div class="value">${formatCurrency(perCapita)}</div>
      </div>
      <div class="result-card">
        <div class="label">Estimated Lives Saved</div>
        <div class="value highlight">${livesSaved.toFixed(1)}</div>
      </div>
      <div class="result-card">
        <div class="label">Cost Per Life Saved</div>
        <div class="value">${formatCurrency(costPerLife)}</div>
      </div>
      <div class="result-card">
        <div class="label">Benefit-Cost Ratio</div>
        <div class="value highlight">${bcr.toFixed(0)}:1</div>
      </div>
    </div>

    <h4 style="margin-top: var(--space-xl); margin-bottom: var(--space-md);">Spending Breakdown</h4>
    <div class="result-cards" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));">
      <div class="result-card">
        <div class="label">Communicable Disease</div>
        <div class="value" style="font-size: 1.2rem;">${formatCurrencyShort(formData.communicable_disease)}</div>
      </div>
      <div class="result-card">
        <div class="label">Chronic Disease</div>
        <div class="value" style="font-size: 1.2rem;">${formatCurrencyShort(formData.chronic_disease)}</div>
      </div>
      <div class="result-card">
        <div class="label">Environmental Health</div>
        <div class="value" style="font-size: 1.2rem;">${formatCurrencyShort(formData.environmental_health)}</div>
      </div>
      <div class="result-card">
        <div class="label">Maternal/Child</div>
        <div class="value" style="font-size: 1.2rem;">${formatCurrencyShort(formData.maternal_child)}</div>
      </div>
    </div>

    <div class="methodology-note">
      <strong>Methodology:</strong> Based on Lewbel IV analysis of California county public health spending (2003-2023).
      The model uses a uniform statewide coefficient: each $10 per capita in public health spending reduces mortality by 9.16 deaths per 100,000.
      Your results reflect ${formData.county} County's population (${population.toLocaleString()}) and your entered spending—the benefit-cost ratio is the same across counties at equal per-capita spending levels.
      Social value uses the HHS Value of Statistical Life ($13.6M, 2025).
      <br><br>
      <strong>Citation:</strong> Cholette, V., Patton, T., &amp; Zarate-Gomez, G. (2026). "The Crisis Response Value of Public Health Infrastructure: Evidence from California Counties." SSRN Working Paper.
    </div>

    <div style="text-align: center; margin-top: var(--space-xl);">
      <p style="color: var(--color-text-muted); margin-bottom: var(--space-md);">
        A detailed PDF report has been sent to ${formData.email}
      </p>
    </div>
  `;
}

// ============ File Upload ============

function initFileUpload() {
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const fileInfo = document.getElementById('file-info');
  const fileName = document.getElementById('file-name');
  const removeBtn = document.getElementById('remove-file');
  const validationDiv = document.getElementById('file-validation');

  // Click to upload
  dropZone.addEventListener('click', () => fileInput.click());

  // Keyboard support for file upload (Enter/Space)
  dropZone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  });

  // Drag and drop
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');

    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  });

  // File input change
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFileSelect(file);
  });

  // Remove file
  removeBtn.addEventListener('click', () => {
    fileInput.value = '';
    fileInfo.classList.remove('show');
    validationDiv.classList.remove('show');
    window.uploadedData = null;
  });
}

async function handleFileSelect(file) {
  const fileInfo = document.getElementById('file-info');
  const fileName = document.getElementById('file-name');
  const validationDiv = document.getElementById('file-validation');

  // Check file type - CSV only
  const ext = file.name.split('.').pop().toLowerCase();

  if (ext !== 'csv') {
    validationDiv.innerHTML = '❌ Please upload a CSV file.';
    validationDiv.classList.add('show', 'error');
    return;
  }

  fileName.textContent = file.name;
  fileInfo.classList.add('show');
  fileInfo.classList.remove('error');
  validationDiv.innerHTML = '⏳ Validating file...';
  validationDiv.classList.add('show');
  validationDiv.classList.remove('error');

  try {
    const data = await parseFile(file, ext);

    // Validate required fields
    const required = ['communicable_disease', 'chronic_disease', 'environmental_health', 'maternal_child'];
    const missing = required.filter(f => !data[f] && data[f] !== 0);

    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }

    // Convert from thousands to actual dollars
    const spendingFields = ['communicable_disease', 'chronic_disease', 'environmental_health', 'maternal_child', 'other_programs'];
    spendingFields.forEach(field => {
      if (data[field]) {
        data[field] = data[field] * 1000;
      }
    });

    // Calculate total (already in actual dollars after conversion)
    data.total_expenditure = (data.communicable_disease || 0) + (data.chronic_disease || 0) +
      (data.environmental_health || 0) + (data.maternal_child || 0) + (data.other_programs || 0);

    // Validate numbers
    if (data.total_expenditure <= 0) {
      throw new Error('Total expenditure must be greater than zero');
    }

    // Store for form submission
    window.uploadedData = data;

    validationDiv.innerHTML = `✓ File validated: ${formatCurrency(data.total_expenditure)} total expenditure`;
    validationDiv.classList.remove('error');


  } catch (error) {
    validationDiv.innerHTML = `❌ ${error.message}`;
    validationDiv.classList.add('error');
    window.uploadedData = null;
  }
}

async function parseFile(file, ext) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        let data = {};

        if (ext === 'csv') {
          data = parseCSV(e.target.result);
        } else {
          // For Excel, we'd need a library like SheetJS
          // For now, show helpful message
          reject(new Error('Excel parsing requires server-side processing. Please use CSV format or enter data manually.'));
          return;
        }

        resolve(data);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));

    if (ext === 'csv') {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
}

function parseCSV(text) {
  const lines = text.trim().split('\n');
  const data = {};

  lines.forEach(line => {
    const [key, value] = line.split(',').map(s => s.trim());
    if (key && value) {
      // Try to parse as number
      const num = parseFloat(value.replace(/[$,]/g, ''));
      data[key.toLowerCase().replace(/\s+/g, '_')] = isNaN(num) ? value : num;
    }
  });

  return data;
}

// ============ Utilities ============

function populateCountyDropdown() {
  const select = document.getElementById('detail-county');

  CALIFORNIA_COUNTIES.forEach(county => {
    const option = document.createElement('option');
    option.value = county;
    option.textContent = `${county} County`;
    select.appendChild(option);
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

function formatCurrencyShort(value) {
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(1)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(0)}K`;
  }
  return formatCurrency(value);
}

// Add suggestion styling
const style = document.createElement('style');
style.textContent = `
  .county-suggestions {
    position: absolute;
    background: white;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    max-height: 200px;
    overflow-y: auto;
    z-index: 100;
    display: none;
    width: 100%;
  }

  .form-group {
    position: relative;
  }

  .suggestion-item {
    padding: var(--space-sm) var(--space-md);
    cursor: pointer;
  }

  .suggestion-item:hover {
    background: var(--color-bg-alt);
  }
`;
document.head.appendChild(style);
