/**
 * CAPHE Website - ROI Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  const countyInput = document.getElementById('county');
  const suggestionsDiv = document.getElementById('county-suggestions');
  const countySelected = document.getElementById('county-selected');
  const roiForm = document.getElementById('roi-form');
  const resultsDiv = document.getElementById('results');

  let debounceTimer;

  // County search with debouncing
  if (countyInput) {
    countyInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      const query = e.target.value.trim();

      if (query.length < 2) {
        suggestionsDiv.classList.remove('active');
        return;
      }

      debounceTimer = setTimeout(() => searchCounties(query), 200);
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.county-search')) {
        suggestionsDiv.classList.remove('active');
      }
    });
  }

  // Form submission
  if (roiForm) {
    roiForm.addEventListener('submit', handleCalculate);
  }
});

// Search counties
async function searchCounties(query) {
  const suggestionsDiv = document.getElementById('county-suggestions');

  try {
    const response = await fetch(`/api/counties/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.counties && data.counties.length > 0) {
      suggestionsDiv.innerHTML = data.counties.map(county => `
        <div class="county-suggestion" data-county="${county.name}">
          <div class="county-suggestion-name">${county.name} County</div>
          <div class="county-suggestion-meta">${county.state} · Pop: ${county.population.toLocaleString()}</div>
        </div>
      `).join('');

      // Add click handlers
      suggestionsDiv.querySelectorAll('.county-suggestion').forEach(el => {
        el.addEventListener('click', () => selectCounty(el.dataset.county));
      });

      suggestionsDiv.classList.add('active');
    } else {
      suggestionsDiv.innerHTML = '<div class="county-suggestion"><em>No counties found</em></div>';
      suggestionsDiv.classList.add('active');
    }
  } catch (error) {
    console.error('Error searching counties:', error);
  }
}

// Select a county
function selectCounty(countyName) {
  const countyInput = document.getElementById('county');
  const countySelected = document.getElementById('county-selected');
  const suggestionsDiv = document.getElementById('county-suggestions');

  countyInput.value = countyName + ' County';
  countySelected.value = countyName;
  suggestionsDiv.classList.remove('active');
}

// Calculate ROI
async function handleCalculate(e) {
  e.preventDefault();

  const countySelected = document.getElementById('county-selected');
  const investment = document.getElementById('investment');
  const resultsDiv = document.getElementById('results');

  const countyName = countySelected.value;
  const investmentAmount = parseFloat(investment.value);

  if (!countyName) {
    alert('Please select a county');
    return;
  }

  try {
    const response = await fetch(
      `/api/counties/${encodeURIComponent(countyName)}/roi?investmentAmount=${investmentAmount}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to calculate ROI');
    }

    const data = await response.json();
    displayResults(data);
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

// Display results
function displayResults(data) {
  const resultsDiv = document.getElementById('results');

  document.getElementById('result-county').textContent = data.county + ' County';
  document.getElementById('result-lives').textContent = data.results.livesSavedPerYear.toFixed(1);
  document.getElementById('result-roi').textContent = data.results.roi.toFixed(0) + '%';
  document.getElementById('result-bcr').textContent = data.results.benefitCostRatio.toFixed(0) + ':1';
  document.getElementById('result-value').textContent = formatCurrency(data.results.economicValue);

  resultsDiv.classList.remove('hidden');

  // Scroll to results
  resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Format currency (also defined in main.js but included here for self-containment)
function formatCurrency(value) {
  if (value >= 1e9) {
    return '$' + (value / 1e9).toFixed(1) + 'B';
  } else if (value >= 1e6) {
    return '$' + (value / 1e6).toFixed(1) + 'M';
  } else if (value >= 1e3) {
    return '$' + (value / 1e3).toFixed(0) + 'K';
  }
  return '$' + value.toLocaleString();
}
