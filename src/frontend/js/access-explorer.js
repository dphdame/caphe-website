/**
 * CAPHE Medi-Cal Provider Access Explorer
 * Visualizes phantom network gaps by county and specialty
 */

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

const SPECIALTY_COLORS = {
  primary_care: '#1565C0',
  behavioral_health: '#7B1FA2',
  dental: '#00838F',
  obgyn: '#C62828',
  other_surgical: '#E65100',
  pharmacy_dme: '#2E7D32'
};

const SPECIALTY_ORDER = [
  'primary_care', 'behavioral_health', 'dental', 'obgyn', 'other_surgical', 'pharmacy_dme'
];

const SPECIALTY_LABEL_MAP = {
  primary_care: 'Primary Care',
  behavioral_health: 'Behavioral Health',
  dental: 'Dental',
  obgyn: 'OB/GYN',
  other_surgical: 'Other Surgical',
  pharmacy_dme: 'Pharmacy & DME'
};

let currentCountyData = null;
let currentSpecialty = 'all';
let currentMapSpecialty = 'all';
let barChart = null;
let trendChart = null;
let scatterChart = null;
let summaryData = null;
let rankingsSortColumn = 'rate';
let rankingsSortAsc = true;   // true = ascending (worst first)
let currentView = 'county';   // 'county' or 'hrr'
let hrrCrosswalk = null;       // loaded from county_hrr_crosswalk.json

document.addEventListener('DOMContentLoaded', () => {
  initCountyAutocomplete();
  initSpecialtyTabs();
  initDownload();
  initMapInteraction();
  initViewToggle();
  initMapSpecialtyFilter();
  loadSummaryData();
  loadHrrCrosswalk();
});

// ============ Accessibility Helpers ============

function announceToScreenReader(message) {
  const announcer = document.getElementById('sr-announcer');
  if (announcer) {
    announcer.textContent = '';
    setTimeout(() => { announcer.textContent = message; }, 50);
  }
}

// Severity based on active providers per 10,000 Medicaid beneficiaries
// Thresholds derived from California county distribution (ACS 2022 C27007)
function getRateSeverity(active, medicaidPop) {
  if (active == null || !medicaidPop || medicaidPop === 0) return { label: 'No data', cls: '', ratio: null };
  const ratio = (active / medicaidPop) * 10000;
  if (ratio < 2.0) return { label: 'Critical', cls: 'severity-critical', ratio };
  if (ratio < 3.5) return { label: 'Low', cls: 'severity-low', ratio };
  if (ratio < 6.0) return { label: 'Fair', cls: 'severity-fair', ratio };
  return { label: 'Good', cls: 'severity-good', ratio };
}

// ============ County Autocomplete ============

function initCountyAutocomplete() {
  const input = document.getElementById('county-input');
  const suggestionsDiv = document.getElementById('county-suggestions');
  let selectedIndex = -1;

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().replace(' county', '');
    selectedIndex = -1;
    input.setAttribute('aria-activedescendant', '');

    if (query.length < 2) {
      suggestionsDiv.innerHTML = '';
      suggestionsDiv.style.display = 'none';
      input.setAttribute('aria-expanded', 'false');
      return;
    }

    const matches = CALIFORNIA_COUNTIES.filter(c =>
      c.toLowerCase().includes(query)
    ).slice(0, 5);

    if (matches.length > 0) {
      suggestionsDiv.innerHTML = matches.map((county, i) =>
        `<div class="suggestion-item" id="suggestion-${i}" role="option" data-county="${county}">${county} County</div>`
      ).join('');
      suggestionsDiv.style.display = 'block';
      input.setAttribute('aria-expanded', 'true');

      suggestionsDiv.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
          const county = item.dataset.county;
          input.value = `${county} County`;
          suggestionsDiv.style.display = 'none';
          input.setAttribute('aria-expanded', 'false');
          loadCountyData(county);
        });
      });
    } else {
      suggestionsDiv.innerHTML = '<div class="suggestion-item" role="option" style="color: var(--color-text-muted);">No matching counties</div>';
      suggestionsDiv.style.display = 'block';
      input.setAttribute('aria-expanded', 'true');
    }
  });

  // Keyboard navigation for autocomplete
  input.addEventListener('keydown', (e) => {
    const suggestions = suggestionsDiv.querySelectorAll('.suggestion-item[data-county]');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, suggestions.length - 1);
      updateSuggestionSelection(suggestions, input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, -1);
      updateSuggestionSelection(suggestions, input);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        suggestions[selectedIndex].click();
      } else {
        const firstMatch = suggestionsDiv.querySelector('.suggestion-item[data-county]');
        if (firstMatch) {
          firstMatch.click();
        } else {
          const query = input.value.toLowerCase().replace(' county', '');
          const match = CALIFORNIA_COUNTIES.find(c => c.toLowerCase() === query);
          if (match) {
            input.value = `${match} County`;
            suggestionsDiv.style.display = 'none';
            input.setAttribute('aria-expanded', 'false');
            loadCountyData(match);
          }
        }
      }
    } else if (e.key === 'Escape') {
      suggestionsDiv.style.display = 'none';
      input.setAttribute('aria-expanded', 'false');
      selectedIndex = -1;
    }
  });

  function updateSuggestionSelection(suggestions, inputEl) {
    suggestions.forEach((item, i) => {
      item.classList.toggle('selected', i === selectedIndex);
    });
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      inputEl.setAttribute('aria-activedescendant', suggestions[selectedIndex].id);
      suggestions[selectedIndex].scrollIntoView({ block: 'nearest' });
    } else {
      inputEl.setAttribute('aria-activedescendant', '');
    }
  }

  // Hide suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !suggestionsDiv.contains(e.target)) {
      suggestionsDiv.style.display = 'none';
    }
  });
}

// ============ Data Loading ============

async function loadCountyData(countyName) {
  const fileName = countyName.toLowerCase().replace(/\s+/g, '_');

  // Show loading state
  announceToScreenReader(`Loading data for ${countyName} County`);
  const loadingEl = document.getElementById('loading-overlay');
  if (loadingEl) {
    loadingEl.querySelector('.loading-county-name').textContent = countyName;
    loadingEl.classList.remove('hidden');
  }
  document.getElementById('map-placeholder').classList.add('hidden');
  document.getElementById('results-panel').classList.remove('hidden');

  try {
    const response = await fetch(`/data/access-explorer/${fileName}.json`);
    if (!response.ok) {
      throw new Error(`Data not available for ${countyName} County`);
    }

    currentCountyData = await response.json();

    // Hide loading
    if (loadingEl) loadingEl.classList.add('hidden');

    // Sync county detail specialty with map specialty filter
    if (currentMapSpecialty !== 'all' && currentCountyData.specialties[currentMapSpecialty]) {
      currentSpecialty = currentMapSpecialty;
    } else {
      currentSpecialty = 'all';
    }

    // Reset specialty tabs to match current selection
    document.querySelectorAll('.specialty-tab[data-specialty]').forEach(tab => {
      const isActive = tab.dataset.specialty === currentSpecialty;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Show results, hide map and rankings panel
    document.getElementById('specialty-section').classList.remove('hidden');
    document.getElementById('specialty-rankings').classList.add('hidden');
    // Collapse About section when viewing county detail
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) aboutSection.classList.add('hidden');

    renderResults();

    // Focus management: move focus to county title
    const countyTitle = document.getElementById('county-title');
    if (countyTitle) {
      countyTitle.setAttribute('tabindex', '-1');
      countyTitle.focus();
    }

    // Announce to screen readers
    let totalReg = 0, totalAct = 0;
    SPECIALTY_ORDER.forEach(key => {
      if (currentCountyData.specialties[key]) {
        totalReg += currentCountyData.specialties[key].registered;
        totalAct += currentCountyData.specialties[key].active;
      }
    });
    const overallRate = totalReg > 0 ? (totalAct / totalReg * 100).toFixed(1) : '0';
    announceToScreenReader(`${countyName} County data loaded. ${overallRate}% participation rate.`);

  } catch (error) {
    // Hide loading overlay
    if (loadingEl) loadingEl.classList.add('hidden');

    // Build full county data object from summary so all charts render
    const countyInfo = summaryData?.counties?.[countyName];
    if (countyInfo && countyInfo.specialties) {
      // Compute stateMedians from summary
      const stateMedians = {};
      SPECIALTY_ORDER.forEach(key => {
        const vals = Object.values(summaryData.counties)
          .map(c => c.specialties?.[key]?.participationRate)
          .filter(v => v != null)
          .sort((a, b) => a - b);
        stateMedians[key] = vals.length > 0 ? vals[Math.floor(vals.length / 2)] : 0;
      });

      // Build specialties with labels and computed fields
      const specialties = {};
      SPECIALTY_ORDER.forEach(key => {
        const s = countyInfo.specialties[key];
        if (!s) return;
        specialties[key] = {
          label: SPECIALTY_LABEL_MAP[key],
          registered: s.registered,
          active: s.active,
          participationRate: s.participationRate,
          phantomGap: s.registered - s.active,
          changeFrom2019: s.changeFrom2019 ?? null
        };
      });

      // Build affordability from summary cost indices
      const affordability = countyInfo.composite_cost_index ? {
        composite_cost_index: countyInfo.composite_cost_index,
        effective_reimbursement_index: countyInfo.effective_reimbursement_index,
        composite_weights: { wages: 0.56, rent: 0.3, purchased_services: 0.14 }
      } : null;

      currentCountyData = {
        county: countyName,
        population: countyInfo.population || null,
        medicaid_population: countyInfo.medicaid_population || null,
        stateMedians,
        specialties,
        affordability,
        trends: null  // no time-series available from summary
      };

      // Sync specialty
      if (currentMapSpecialty !== 'all' && currentCountyData.specialties[currentMapSpecialty]) {
        currentSpecialty = currentMapSpecialty;
      } else {
        currentSpecialty = 'all';
      }

      document.querySelectorAll('.specialty-tab[data-specialty]').forEach(tab => {
        const isActive = tab.dataset.specialty === currentSpecialty;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      document.getElementById('map-placeholder').classList.add('hidden');
      document.getElementById('results-panel').classList.remove('hidden');
      document.getElementById('specialty-rankings').classList.add('hidden');
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) aboutSection.classList.add('hidden');

      renderResults();

      const countyTitle = document.getElementById('county-title');
      if (countyTitle) {
        countyTitle.setAttribute('tabindex', '-1');
        countyTitle.focus();
      }
    } else {
      document.getElementById('map-placeholder').classList.remove('hidden');
      document.getElementById('results-panel').classList.add('hidden');

      const instructions = document.querySelector('.map-instructions');
      if (instructions) {
        instructions.textContent = countyName + ' County data is not yet available. Select another county.';
        instructions.style.color = 'var(--color-warning)';
        setTimeout(() => {
          instructions.textContent = 'Click a county or search below to explore access data.';
          instructions.style.color = '';
        }, 4000);
      }
    }
  }
}

function renderCountySummaryTable(countyName, countyInfo) {
  // Show results panel, hide map
  document.getElementById('map-placeholder').classList.add('hidden');
  document.getElementById('results-panel').classList.remove('hidden');
  document.getElementById('specialty-section').classList.add('hidden');
  document.getElementById('specialty-rankings').classList.add('hidden');

  // Set county title
  const titleEl = document.getElementById('county-title');
  if (titleEl) titleEl.textContent = countyName + ' County';
  // Collapse About section
  const aboutSection = document.getElementById('about-section');
  if (aboutSection) aboutSection.classList.add('hidden');

  // Summary stats
  document.getElementById('stat-registered').textContent = countyInfo.registered.toLocaleString();
  document.getElementById('stat-active').textContent = countyInfo.active.toLocaleString();
  const rateEl = document.getElementById('stat-rate');
  rateEl.textContent = countyInfo.participationRate + '%';
  rateEl.className = 'stat-number ' + getRateClass(countyInfo.participationRate);

  // Build specialty table
  const specs = countyInfo.specialties;
  const rows = SPECIALTY_ORDER
    .filter(key => specs[key])
    .map(key => {
      const s = specs[key];
      return { key, label: SPECIALTY_LABEL_MAP[key], rate: s.participationRate, active: s.active, registered: s.registered };
    });

  let html = `
    <div style="margin-bottom: var(--space-md);">
      <h3 style="font-size: 1.1rem; margin-bottom: var(--space-xs);">${countyName} County</h3>
    </div>
    <table class="hrr-county-table">
      <thead>
        <tr>
          <th>Specialty</th>
          <th>Rate</th>
          <th>Active</th>
          <th>Registered</th>
        </tr>
      </thead>
      <tbody>`;

  rows.forEach(row => {
    const rateClass = getRateClass(row.rate);
    html += `
        <tr>
          <td>${row.label}</td>
          <td class="${rateClass}" style="font-weight: 600;">${row.rate}%</td>
          <td>${row.active.toLocaleString()}</td>
          <td>${row.registered.toLocaleString()}</td>
        </tr>`;
  });

  html += `
      </tbody>
    </table>`;

  document.getElementById('rate-cards').innerHTML = html;

  // Hide chart sections
  document.querySelectorAll('#results-panel .chart-section').forEach(s => s.classList.add('hidden'));
}

// ============ Rendering ============

function renderResults() {
  if (!currentCountyData) return;

  // Set county title
  const titleEl = document.getElementById('county-title');
  if (titleEl) titleEl.textContent = currentCountyData.county + ' County';

  // Unhide chart sections (may be hidden by HRR view)
  document.querySelectorAll('#results-panel .chart-section').forEach(s => s.classList.remove('hidden'));
  document.getElementById('specialty-section').classList.remove('hidden');

  renderContextualContent();
  renderSummaryStats();
  renderRateCards();
  renderBarChart();
  renderTrendChart();
  renderAlerts();

  // Affordability section: cost cards + insight need detailed data; scatter plot works from summary
  const affSection = document.getElementById('affordability-section');
  if (currentCountyData.affordability && currentCountyData.affordability.wage_index) {
    affSection.classList.remove('hidden');
    renderAffordability(currentCountyData);
  } else {
    // Still show scatter plot even without detailed affordability
    affSection.classList.remove('hidden');
    const costCards = document.getElementById('cost-cards');
    if (costCards) costCards.innerHTML = '';
    const costInsight = document.getElementById('cost-insight');
    if (costInsight) costInsight.innerHTML = '';
    const medicareComp = document.getElementById('medicare-comparison');
    if (medicareComp) medicareComp.innerHTML = '';
    renderScatterPlot(currentCountyData.county);
  }
}

function renderContextualContent() {
  const data = currentCountyData;
  const county = data.county;

  // Compute overall stats
  let totalReg = 0, totalAct = 0;
  SPECIALTY_ORDER.forEach(key => {
    if (data.specialties[key]) {
      totalReg += data.specialties[key].registered;
      totalAct += data.specialties[key].active;
    }
  });
  const overallRate = totalReg > 0 ? (totalAct / totalReg * 100).toFixed(1) : '0';
  const phantomTotal = totalReg - totalAct;

  // Find lowest and highest specialty
  let lowestSpec = null, highestSpec = null;
  SPECIALTY_ORDER.forEach(key => {
    const s = data.specialties[key];
    if (!s) return;
    if (!lowestSpec || s.participationRate < lowestSpec.rate) {
      lowestSpec = { key, label: s.label, rate: s.participationRate };
    }
    if (!highestSpec || s.participationRate > highestSpec.rate) {
      highestSpec = { key, label: s.label, rate: s.participationRate };
    }
  });

  // State average from summary data
  const stateCounty = summaryData?.counties?.[county];
  const stateAvgText = summaryData ? (() => {
    let sReg = 0, sAct = 0;
    Object.values(summaryData.counties).forEach(c => { sReg += c.registered || 0; sAct += c.active || 0; });
    return sReg > 0 ? (sAct / sReg * 100).toFixed(1) : null;
  })() : null;

  // Cost context
  const costAbove = data.affordability?.composite_cost_index
    ? Math.round(data.affordability.composite_cost_index - 100)
    : null;

  // 1. County summary statement
  const summaryEl = document.getElementById('county-summary-statement');
  if (summaryEl) {
    let stmt = `In ${county} County, ${overallRate}% of licensed providers actively bill Medi-Cal`;
    if (stateAvgText) {
      const comparison = parseFloat(overallRate) < parseFloat(stateAvgText) ? 'below' : 'above';
      stmt += `, ${comparison} the ${stateAvgText}% statewide average`;
    }
    stmt += `. Of ${totalReg.toLocaleString()} registered providers, ${phantomTotal.toLocaleString()} opt out of the program.`;
    if (costAbove !== null && Math.abs(costAbove) > 5) {
      const dir = costAbove > 0 ? 'above' : 'below';
      stmt += ` Practice operating costs here run ${Math.abs(costAbove)}% ${dir} the state average.`;
    }
    summaryEl.textContent = stmt;
  }

  // 2. Rate cards context
  const rateCtx = document.getElementById('rate-cards-context');
  if (rateCtx && lowestSpec && highestSpec) {
    rateCtx.textContent = `${highestSpec.label} is highest at ${highestSpec.rate}%, ` +
      `while ${lowestSpec.label} is lowest at ${lowestSpec.rate}%. ` +
      `The change from 2019 captures net shifts during COVID-19 and the Medicaid continuous enrollment unwinding.`;
  }

  // 3. Bar chart context and caption
  const barCtx = document.getElementById('bar-chart-context');
  if (barCtx) {
    barCtx.textContent = `The gap between each bar pair is the phantom gap: providers licensed in ${county} County ` +
      `who do not bill Medicaid. Where gaps are large, Medi-Cal reimbursement may not cover the opportunity cost ` +
      `of serving private-pay or Medicare patients.`;
  }
  const barCap = document.getElementById('bar-chart-caption');
  if (barCap) {
    barCap.textContent = `Source: NPPES (registered) and HHS Medicaid Provider Spending, Feb 2026 (active). ` +
      `Data covers trailing 12 months ending December 2024.`;
  }

  // 4. Trend chart context and caption (only if trend data available)
  const trendCtx = document.getElementById('trend-chart-context');
  const trendCap = document.getElementById('trend-chart-caption');
  if (data.trends) {
    if (trendCtx) {
      trendCtx.textContent = `The index shows whether provider participation is rising or falling relative to January 2019. ` +
        `A value below 100 means fewer providers bill Medicaid now than before the pandemic. ` +
        `The COVID-19 onset and PHE unwinding markers help distinguish pandemic disruption from structural decline.`;
    }
    if (trendCap) {
      trendCap.textContent = `Source: Monthly participation rates from HHS Medicaid Provider Spending, ` +
        `indexed to January 2019 = 100. ${county} County, January 2018 through December 2024.`;
    }
  } else {
    if (trendCtx) trendCtx.textContent = '';
    if (trendCap) trendCap.textContent = '';
  }

  // 5. Scatter plot context and caption
  const scatterCtx = document.getElementById('scatter-context');
  if (scatterCtx && data.affordability) {
    const costIdx = data.affordability.composite_cost_index;
    const costDir = costIdx > 100 ? 'above' : 'below';
    const costDiff = Math.abs(Math.round(costIdx - 100));
    const rateNum = parseFloat(overallRate);
    const stateAvg = stateAvgText ? parseFloat(stateAvgText) : null;
    const rateDir = stateAvg && rateNum < stateAvg ? 'below' : 'above';

    scatterCtx.textContent = `Each dot is a California county. The horizontal axis measures practice operating costs ` +
      `relative to the state average (100). The vertical axis shows the overall Medi-Cal participation rate. ` +
      `${county} County (highlighted) has costs ${costDiff}% ${costDir} average ` +
      `and a participation rate ${rateDir} the statewide median. ` +
      `Counties in the lower-right quadrant face both high costs and low participation, ` +
      `the pattern predicted when flat-rate reimbursement meets variable operating costs.`;
  }
  const scatterCap = document.getElementById('scatter-caption');
  if (scatterCap) {
    scatterCap.textContent = `Source: Practice cost index computed from BLS OEWS (wages), HUD FMR (rent), ` +
      `and BEA RPP (purchased services). Participation rates from HHS Medicaid Provider Spending, Feb 2026.`;
  }
}

function renderSummaryStats() {
  const data = currentCountyData;
  let totalRegistered = 0;
  let totalActive = 0;

  SPECIALTY_ORDER.forEach(key => {
    if (data.specialties[key]) {
      totalRegistered += data.specialties[key].registered;
      totalActive += data.specialties[key].active;
    }
  });

  const overallRate = totalRegistered > 0 ? (totalActive / totalRegistered * 100) : 0;

  document.getElementById('stat-registered').textContent = totalRegistered.toLocaleString();
  document.getElementById('stat-active').textContent = totalActive.toLocaleString();

  const rateEl = document.getElementById('stat-rate');
  rateEl.textContent = overallRate.toFixed(1) + '%';
  rateEl.className = 'stat-number ' + getRateClass(overallRate);
}

function renderRateCards() {
  const container = document.getElementById('rate-cards');
  const data = currentCountyData;

  // Get Medicaid population from summary data for per-capita severity
  const countyName = data.county;
  const medicaidPop = summaryData?.counties?.[countyName]?.medicaid_population || 0;

  let html = '';
  SPECIALTY_ORDER.forEach(key => {
    const spec = data.specialties[key];
    if (!spec) return;

    const rateClass = getRateClass(spec.participationRate);
    const changeClass = spec.changeFrom2019 >= 0 ? 'change-positive' : 'change-negative';
    const changeSign = spec.changeFrom2019 >= 0 ? '+' : '';
    const isActive = currentSpecialty === key ? ' active' : '';
    const pctActive = spec.registered > 0 ? (spec.active / spec.registered * 100) : 0;
    const pctPhantom = 100 - pctActive;

    const severity = getRateSeverity(spec.active, medicaidPop);
    const ratioText = severity.ratio != null ? `${severity.ratio.toFixed(1)} per 10K` : '';

    html += `
      <div class="rate-card${isActive}" data-specialty="${key}" tabindex="0" role="button" aria-label="${spec.label}: ${spec.participationRate}% participation rate, ${ratioText} beneficiaries, ${severity.label}">
        <div class="rate-label">${spec.label}</div>
        <div class="rate-severity ${severity.cls}" title="${ratioText} Medicaid beneficiaries">${severity.label === 'Critical' ? '\u26A0 ' : severity.label === 'Low' ? '\u25D0 ' : severity.label === 'Fair' ? '\u25D1 ' : severity.label === 'Good' ? '\u2713 ' : ''}${severity.label}</div>
        <div class="rate-value ${rateClass}">${spec.participationRate}%</div>
        <div class="rate-change ${changeClass}">${changeSign}${spec.changeFrom2019}pp from 2019</div>
        <div class="phantom-bar" aria-label="${Math.round(pctActive)}% active, ${Math.round(pctPhantom)}% phantom">
          <div class="phantom-bar-active" style="width: ${pctActive}%"></div>
          <div class="phantom-bar-phantom" style="width: ${pctPhantom}%"></div>
        </div>
        <div class="rate-sub">${spec.active} active / ${spec.registered} registered</div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Click handlers on rate cards
  container.querySelectorAll('.rate-card').forEach(card => {
    card.addEventListener('click', () => {
      const specialty = card.dataset.specialty;
      selectSpecialty(specialty);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectSpecialty(card.dataset.specialty);
      }
    });
  });
}

function renderBarChart() {
  const data = currentCountyData;
  const ctx = document.getElementById('bar-chart').getContext('2d');

  const labels = [];
  const registeredData = [];
  const activeData = [];
  const bgColors = [];

  SPECIALTY_ORDER.forEach(key => {
    const spec = data.specialties[key];
    if (!spec) return;

    if (currentSpecialty !== 'all' && currentSpecialty !== key) return;

    labels.push(spec.label);
    registeredData.push(spec.registered);
    activeData.push(spec.active);
    bgColors.push(SPECIALTY_COLORS[key]);
  });

  if (barChart) barChart.destroy();

  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Registered (NPPES)',
          data: registeredData,
          backgroundColor: 'rgba(200, 200, 200, 0.6)',
          borderColor: 'rgba(150, 150, 150, 0.8)',
          borderWidth: 1
        },
        {
          label: 'Active (Billing Medicaid)',
          data: activeData,
          backgroundColor: bgColors.map(c => c + 'CC'),
          borderColor: bgColors,
          borderWidth: 1
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { size: 11 } }
        },
        tooltip: {
          callbacks: {
            afterBody: function(context) {
              const idx = context[0].dataIndex;
              if (registeredData[idx] > 0) {
                const rate = (activeData[idx] / registeredData[idx] * 100).toFixed(1);
                const gap = registeredData[idx] - activeData[idx];
                return [`Participation: ${rate}%`, `Phantom gap: ${gap} providers`];
              }
              return [];
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Providers',
            font: { size: 11 }
          }
        },
        y: {
          ticks: { font: { size: 11 } }
        }
      }
    }
  });
}

function renderTrendChart() {
  const data = currentCountyData;
  // Hide trend chart section if no time-series data
  const trendSection = document.getElementById('trend-chart')?.closest('.chart-section');
  if (!data.trends) {
    if (trendSection) trendSection.classList.add('hidden');
    // Also hide trend context/caption
    const trendCtx = document.getElementById('trend-chart-context');
    const trendCap = document.getElementById('trend-chart-caption');
    if (trendCtx) trendCtx.textContent = '';
    if (trendCap) trendCap.textContent = '';
    return;
  }
  if (trendSection) trendSection.classList.remove('hidden');
  const ctx = document.getElementById('trend-chart').getContext('2d');
  const months = data.trends.months;

  // Determine which specialties to show
  const specialtiesToShow = currentSpecialty === 'all'
    ? SPECIALTY_ORDER
    : [currentSpecialty];

  const datasets = specialtiesToShow.map(key => {
    const spec = data.specialties[key];
    return {
      label: spec ? spec.label : key,
      data: data.trends[key],
      borderColor: SPECIALTY_COLORS[key],
      backgroundColor: SPECIALTY_COLORS[key] + '20',
      borderWidth: currentSpecialty === 'all' ? 1.5 : 2.5,
      pointRadius: 0,
      pointHoverRadius: 4,
      tension: 0.3,
      fill: currentSpecialty !== 'all'
    };
  });

  // Add state median line if single specialty
  if (currentSpecialty !== 'all' && data.stateMedians[currentSpecialty]) {
    const medianVal = data.stateMedians[currentSpecialty];
    // Normalize: state median as a percentage, shown as index relative to this specialty
    // Actually, the trends are already indexed. Let's just add a reference line at 100 (Jan 2019 baseline).
  }

  if (trendChart) trendChart.destroy();

  // Format labels to show only year boundaries
  const formattedLabels = months.map((m, i) => {
    if (m.endsWith('-01')) return m.substring(0, 4);
    return '';
  });

  trendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: formattedLabels,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          display: currentSpecialty === 'all',
          position: 'bottom',
          labels: { font: { size: 10 }, boxWidth: 12 }
        },
        tooltip: {
          callbacks: {
            title: function(context) {
              const idx = context[0].dataIndex;
              return months[idx];
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            maxRotation: 0,
            font: { size: 10 },
            callback: function(value, index) {
              return formattedLabels[index] || '';
            }
          },
          grid: { display: false }
        },
        y: {
          title: {
            display: true,
            text: 'Index (Jan 2019 = 100)',
            font: { size: 11 }
          },
          suggestedMin: 60,
          suggestedMax: 110
        }
      }
    }
  });

  // Update trend title
  const titleEl = document.getElementById('trend-title');
  if (currentSpecialty !== 'all') {
    const specLabel = data.specialties[currentSpecialty]?.label || currentSpecialty;
    titleEl.textContent = `${specLabel} - Monthly Participation Index (Jan 2019 = 100)`;
  } else {
    titleEl.textContent = 'Monthly Participation Index (Jan 2019 = 100)';
  }
}

function renderAlerts() {
  const container = document.getElementById('alerts-panel');
  const data = currentCountyData;

  let html = '';
  SPECIALTY_ORDER.forEach(key => {
    const spec = data.specialties[key];
    if (!spec) return;

    if (spec.participationRate < 20) {
      html += `<div class="alert-item">
        <strong>${spec.label}:</strong>&nbsp;Only ${spec.participationRate}% participation rate &mdash; ${spec.phantomGap} phantom providers
      </div>`;
    } else if (spec.participationRate < 30) {
      html += `<div class="alert-item warning">
        <strong>${spec.label}:</strong>&nbsp;${spec.participationRate}% participation, below state median of ${data.stateMedians[key]}%
      </div>`;
    }
  });

  container.innerHTML = html;
}

// ============ Specialty Tab Navigation ============

function initSpecialtyTabs() {
  const tabsContainer = document.getElementById('specialty-tabs');
  if (!tabsContainer) return;

  tabsContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.specialty-tab');
    if (!tab) return;
    selectSpecialty(tab.dataset.specialty);
  });

  // Keyboard navigation
  tabsContainer.addEventListener('keydown', (e) => {
    const tabs = Array.from(tabsContainer.querySelectorAll('.specialty-tab'));
    const currentIdx = tabs.indexOf(document.activeElement);
    let targetIdx;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      targetIdx = (currentIdx + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      targetIdx = (currentIdx - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetIdx = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      targetIdx = tabs.length - 1;
    }

    if (targetIdx !== undefined) {
      tabs[targetIdx].focus();
      selectSpecialty(tabs[targetIdx].dataset.specialty);
    }
  });
}

function selectSpecialty(specialty) {
  currentSpecialty = specialty;

  // Update tab states (scoped to county detail tabs, not map filter)
  document.querySelectorAll('#specialty-tabs .specialty-tab').forEach(tab => {
    const isActive = tab.dataset.specialty === specialty;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Update rate card states
  document.querySelectorAll('.rate-card').forEach(card => {
    card.classList.toggle('active', card.dataset.specialty === specialty);
  });

  // Re-render charts
  if (currentCountyData) {
    renderBarChart();
    renderTrendChart();
  }
}

// ============ CSV Download ============

function initDownload() {
  const btn = document.getElementById('download-csv');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (!currentCountyData) return;
    downloadCSV();
  });
}

function downloadCSV() {
  const data = currentCountyData;
  const rows = [
    ['County', 'Specialty', 'Registered', 'Active', 'Participation Rate (%)', 'Phantom Gap', 'Change from 2019 (pp)']
  ];

  SPECIALTY_ORDER.forEach(key => {
    const spec = data.specialties[key];
    if (!spec) return;
    rows.push([
      data.county,
      spec.label,
      spec.registered,
      spec.active,
      spec.participationRate,
      spec.phantomGap,
      spec.changeFrom2019
    ]);
  });

  // Add totals row
  let totalReg = 0, totalAct = 0, totalPhantom = 0;
  SPECIALTY_ORDER.forEach(key => {
    const spec = data.specialties[key];
    if (!spec) return;
    totalReg += spec.registered;
    totalAct += spec.active;
    totalPhantom += spec.phantomGap;
  });
  const totalRate = totalReg > 0 ? (totalAct / totalReg * 100).toFixed(1) : '0';
  rows.push([data.county, 'TOTAL', totalReg, totalAct, totalRate, totalPhantom, '']);

  // Add affordability data if available
  if (data.affordability) {
    const aff = data.affordability;
    rows.push([]);
    rows.push(['Affordability Context']);
    rows.push(['Composite Cost Index', aff.composite_cost_index]);
    rows.push(['Effective Reimbursement Index', aff.effective_reimbursement_index]);
    rows.push(['Healthcare Wage Index (56%)', aff.wage_index]);
    rows.push(['Facility Rent Index (30%)', aff.rent_index]);
    rows.push(['Purchased Services Index (14%)', aff.purchased_services_index]);
    rows.push(['Per Capita Income', aff.per_capita_income]);
    if (aff.medicare_gap_pct != null) {
      rows.push(['Medicare Geographic Adjustment (%)', aff.medicare_gap_pct]);
    }
  }

  const csvContent = rows.map(row =>
    row.map(cell => {
      const str = String(cell);
      return str.includes(',') ? `"${str}"` : str;
    }).join(',')
  ).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `medicaid-access-${data.county.toLowerCase().replace(/\s+/g, '_')}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

// ============ Utilities ============

function getRateClass(rate) {
  if (rate >= 60) return 'rate-good';
  if (rate >= 30) return 'rate-warning';
  return 'rate-critical';
}

// ============ County Heatmap ============

function initMapInteraction() {
  const mapWrapper = document.getElementById('map-wrapper');
  if (!mapWrapper) return;

  // Click handler (delegated)
  mapWrapper.addEventListener('click', handleMapClick);

  // Keyboard handler for SVG county paths
  mapWrapper.addEventListener('keydown', (e) => {
    const path = e.target.closest('path[data-county]');
    if (!path) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleMapClick({ target: path });
    }
  });

  // Hover handlers for tooltip
  mapWrapper.addEventListener('mousemove', handleMapHover);
  mapWrapper.addEventListener('mouseleave', () => {
    const tooltip = document.getElementById('map-tooltip');
    if (tooltip) tooltip.classList.add('hidden');
  });

  // Focus handler for tooltip on keyboard nav
  mapWrapper.addEventListener('focusin', (e) => {
    const path = e.target.closest('path[data-county]');
    if (path) handleMapHover({ target: path, clientX: 0, clientY: 0, isFocus: true });
  });
  mapWrapper.addEventListener('focusout', () => {
    const tooltip = document.getElementById('map-tooltip');
    if (tooltip) tooltip.classList.add('hidden');
  });

  // "Back to map" button
  const showMapBtn = document.getElementById('show-map-btn');
  if (showMapBtn) {
    showMapBtn.addEventListener('click', showMap);
  }

  // "About this tool" link — return to map view and scroll to About section
  const aboutLink = document.getElementById('about-link');
  if (aboutLink) {
    aboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      showMap();
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

function initMap() {
  if (!summaryData || !summaryData.counties) return;

  const counties = summaryData.counties;
  Object.entries(counties).forEach(([name, data]) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const path = document.getElementById('county-' + slug);
    if (path) {
      const rate = getCountyRate(data, currentMapSpecialty);
      path.style.fill = getMapColor(rate);
      // Keyboard accessibility
      path.setAttribute('tabindex', '0');
      path.setAttribute('role', 'button');
      path.setAttribute('aria-label', `${name} County: ${rate != null ? rate + '% participation' : 'no data'}`);
    }
  });
}

function getCountyRate(countyData, specialty) {
  if (specialty === 'all') return countyData.participationRate;
  return countyData.specialties?.[specialty]?.participationRate ?? null;
}

function getHrrRate(hrrData, specialty) {
  if (specialty === 'all') return hrrData.participationRate;
  return hrrData.specialties?.[specialty]?.participationRate ?? null;
}

// Sequential single-hue blue scale (colorblind-safe, D3 Blues)
function getMapColor(rate) {
  if (rate === 0 || rate == null) return '#e0e0e0';
  if (rate < 25) return '#c6dbef';     // lightest blue — critical
  if (rate < 30) return '#9ecae1';     // light blue
  if (rate < 35) return '#6baed6';     // medium-light blue
  if (rate < 40) return '#3182bd';     // medium blue
  if (rate < 45) return '#08519c';     // dark blue
  return '#08306b';                    // darkest blue — good
}

function handleMapClick(event) {
  const path = event.target.closest('path');
  if (!path) return;

  const countyName = path.dataset.county;
  if (!countyName) return;

  if (currentView === 'hrr') {
    handleMapClickHrr(countyName);
    return;
  }

  // County view: set input and load data
  document.getElementById('county-input').value = countyName + ' County';
  loadCountyData(countyName);

  // Highlight selected county
  document.querySelectorAll('#map-wrapper path.selected').forEach(p => p.classList.remove('selected'));
  path.classList.add('selected');
}

function handleMapHover(event) {
  const tooltip = document.getElementById('map-tooltip');
  if (!tooltip) return;

  const path = event.target.closest('path');
  if (!path || !path.dataset.county) {
    tooltip.classList.add('hidden');
    return;
  }

  const name = path.dataset.county;

  const specLabel = currentMapSpecialty !== 'all' ? SPECIALTY_LABEL_MAP[currentMapSpecialty] + ': ' : '';

  if (currentView === 'hrr' && hrrCrosswalk) {
    const hrrName = hrrCrosswalk.county_to_hrr[name];
    const hrrData = summaryData?.hrrs?.[hrrName];
    if (hrrData) {
      const rate = getHrrRate(hrrData, currentMapSpecialty);
      tooltip.textContent = hrrName + ' HRR: ' + specLabel + (rate != null ? rate + '%' : 'No data') + ' (' + hrrData.counties.length + ' counties)';
    } else {
      tooltip.textContent = name + ' (HRR data unavailable)';
    }
  } else {
    const countyData = summaryData?.counties[name];
    const rate = countyData ? getCountyRate(countyData, currentMapSpecialty) : null;
    tooltip.textContent = name + ': ' + specLabel + (rate != null ? rate + '%' : 'No data');
  }

  // Position relative to the map container
  const container = document.querySelector('.map-container');
  const rect = container.getBoundingClientRect();
  tooltip.style.left = (event.clientX - rect.left + 12) + 'px';
  tooltip.style.top = (event.clientY - rect.top - 30) + 'px';
  tooltip.classList.remove('hidden');
}

function showMap() {
  document.getElementById('map-placeholder').classList.remove('hidden');
  document.getElementById('results-panel').classList.add('hidden');
  document.getElementById('specialty-section').classList.add('hidden');
  // Restore About section
  const aboutSection = document.getElementById('about-section');
  if (aboutSection) aboutSection.classList.remove('hidden');
  // Show specialty rankings if a specialty is selected
  if (currentMapSpecialty !== 'all' && summaryData) {
    renderSpecialtyRankings(currentMapSpecialty);
  }

  // Clear input and selection
  document.getElementById('county-input').value = '';
  document.querySelectorAll('#map-wrapper path.selected').forEach(p => p.classList.remove('selected'));
  document.querySelectorAll('#map-wrapper path.hrr-highlight').forEach(p => p.classList.remove('hrr-highlight'));
  document.querySelectorAll('#map-wrapper path.hrr-dimmed').forEach(p => p.classList.remove('hrr-dimmed'));
  currentCountyData = null;

  // Restore map colors for current view
  if (currentView === 'hrr') {
    initMapHrr();
  } else {
    initMap();
  }
}

// ============ Map Specialty Filter ============

function initMapSpecialtyFilter() {
  document.querySelectorAll('[data-map-specialty]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentMapSpecialty = btn.dataset.mapSpecialty;
      // Update active states
      document.querySelectorAll('[data-map-specialty]').forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      // Re-color map
      if (currentView === 'hrr') {
        initMapHrr();
      } else {
        initMap();
      }
      // Update legend title
      updateLegendTitle();
      // Show/hide specialty rankings panel
      renderSpecialtyRankings(currentMapSpecialty);
    });
  });
}

function updateLegendTitle() {
  const titleEl = document.querySelector('.legend-title');
  if (!titleEl) return;
  if (currentMapSpecialty === 'all') {
    titleEl.textContent = 'Medi-Cal Participation Rate';
  } else {
    titleEl.textContent = SPECIALTY_LABEL_MAP[currentMapSpecialty] + ' Participation Rate';
  }
}

// ============ HRR (Market Area) View ============

async function loadHrrCrosswalk() {
  try {
    const response = await fetch('/data/access-explorer/county_hrr_crosswalk.json');
    if (response.ok) {
      hrrCrosswalk = await response.json();
    }
  } catch (e) {
    // Crosswalk is optional; HRR view won't be available without it
  }
}

function initViewToggle() {
  const buttons = document.querySelectorAll('.view-btn[data-view]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      if (view === currentView) return;
      switchView(view);
    });
  });
}

function switchView(view) {
  currentView = view;

  // Update toggle button states
  document.querySelectorAll('.view-btn[data-view]').forEach(btn => {
    const isActive = btn.dataset.view === view;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-checked', isActive ? 'true' : 'false');
  });

  // Clear any HRR highlighting
  document.querySelectorAll('#map-wrapper path.hrr-highlight').forEach(p => p.classList.remove('hrr-highlight'));
  document.querySelectorAll('#map-wrapper path.hrr-dimmed').forEach(p => p.classList.remove('hrr-dimmed'));
  document.querySelectorAll('#map-wrapper path.selected').forEach(p => p.classList.remove('selected'));

  // Hide results panel and show map
  document.getElementById('map-placeholder').classList.remove('hidden');
  document.getElementById('results-panel').classList.add('hidden');
  document.getElementById('specialty-section').classList.add('hidden');
  document.getElementById('specialty-rankings').classList.add('hidden');
  document.getElementById('county-input').value = '';
  currentCountyData = null;

  // Update map instructions
  const instructions = document.querySelector('.map-instructions');
  if (instructions) {
    if (view === 'hrr') {
      instructions.textContent = 'Counties are colored by their Healthcare Referral Region. Click any county to see market-level data.';
    } else {
      instructions.textContent = 'Click a county on the map or type a name above to explore provider access data.';
    }
  }

  // Recolor map
  if (view === 'hrr') {
    initMapHrr();
  } else {
    initMap();
  }
}

function initMapHrr() {
  if (!summaryData || !summaryData.hrrs || !hrrCrosswalk) return;

  const hrrs = summaryData.hrrs;
  const countyToHrr = hrrCrosswalk.county_to_hrr;

  // Color each county by its HRR's aggregate rate (specialty-aware)
  Object.entries(countyToHrr).forEach(([countyName, hrrName]) => {
    const slug = countyName.toLowerCase().replace(/\s+/g, '-');
    const path = document.getElementById('county-' + slug);
    if (path && hrrs[hrrName]) {
      const rate = getHrrRate(hrrs[hrrName], currentMapSpecialty);
      path.style.fill = getMapColor(rate);
      path.setAttribute('aria-label', `${countyName} County (${hrrName} HRR): ${rate != null ? rate + '% participation' : 'no data'}`);
    }
  });
}

function handleMapClickHrr(countyName) {
  if (!hrrCrosswalk || !summaryData?.hrrs) return;

  const hrrName = hrrCrosswalk.county_to_hrr[countyName];
  if (!hrrName) return;

  const hrrData = summaryData.hrrs[hrrName];
  if (!hrrData) return;

  // Highlight all counties in this HRR, dim others
  const hrrCounties = new Set(hrrData.counties);
  document.querySelectorAll('#map-wrapper path[data-county]').forEach(path => {
    const name = path.dataset.county;
    path.classList.remove('selected', 'hrr-highlight', 'hrr-dimmed');
    if (hrrCounties.has(name)) {
      path.classList.add('hrr-highlight');
    } else {
      path.classList.add('hrr-dimmed');
    }
  });

  // Show HRR results
  renderHrrResults(hrrName);
}

function renderHrrResults(hrrName) {
  const hrrData = summaryData.hrrs[hrrName];
  if (!hrrData) return;

  // Show results panel, hide map placeholder
  document.getElementById('map-placeholder').classList.add('hidden');
  document.getElementById('results-panel').classList.remove('hidden');
  document.getElementById('specialty-section').classList.add('hidden');
  document.getElementById('specialty-rankings').classList.add('hidden');

  // Set HRR title
  const titleEl = document.getElementById('county-title');
  if (titleEl) titleEl.textContent = hrrName + ' Healthcare Market';

  // Update summary stats (specialty-aware)
  const hrrRate = getHrrRate(hrrData, currentMapSpecialty);
  if (currentMapSpecialty !== 'all' && hrrData.specialties?.[currentMapSpecialty]) {
    const specData = hrrData.specialties[currentMapSpecialty];
    document.getElementById('stat-registered').textContent = specData.registered.toLocaleString();
    document.getElementById('stat-active').textContent = specData.active.toLocaleString();
  } else {
    document.getElementById('stat-registered').textContent = hrrData.registered.toLocaleString();
    document.getElementById('stat-active').textContent = hrrData.active.toLocaleString();
  }
  const rateEl = document.getElementById('stat-rate');
  rateEl.textContent = (hrrRate != null ? hrrRate : 0) + '%';
  rateEl.className = 'stat-number ' + getRateClass(hrrRate || 0);

  // Build per-county breakdown table (specialty-aware)
  const counties = hrrData.counties;
  const countyRows = counties.map(name => {
    const cd = summaryData.counties[name] || {};
    const rate = getCountyRate(cd, currentMapSpecialty);
    return {
      name: name,
      registered: (currentMapSpecialty !== 'all' ? cd.specialties?.[currentMapSpecialty]?.registered : cd.registered) || 0,
      active: (currentMapSpecialty !== 'all' ? cd.specialties?.[currentMapSpecialty]?.active : cd.active) || 0,
      rate: rate || 0,
    };
  }).sort((a, b) => b.rate - a.rate);

  const specSubtitle = currentMapSpecialty !== 'all' ? ' &mdash; ' + SPECIALTY_LABEL_MAP[currentMapSpecialty] : '';
  let html = `
    <div style="margin-bottom: var(--space-md);">
      <h3 style="font-size: 1.1rem; margin-bottom: var(--space-xs);">${hrrName} Healthcare Market${specSubtitle}</h3>
      <p style="font-size: var(--font-size-sm); color: var(--color-text-muted);">
        ${counties.length} counties &middot; Population: ${hrrData.population.toLocaleString()}
      </p>
    </div>
    <table class="hrr-county-table">
      <thead>
        <tr>
          <th>County</th>
          <th>Rate</th>
          <th>Active</th>
          <th>Registered</th>
        </tr>
      </thead>
      <tbody>`;

  countyRows.forEach(row => {
    const rateClass = getRateClass(row.rate);
    html += `
        <tr style="cursor: pointer;" data-hrr-county="${row.name}">
          <td>${row.name}</td>
          <td class="${rateClass}" style="font-weight: 600;">${row.rate}%</td>
          <td>${row.active.toLocaleString()}</td>
          <td>${row.registered.toLocaleString()}</td>
        </tr>`;
  });

  html += `
      </tbody>
    </table>
    <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: var(--space-md);">
      Hospital Referral Regions defined by the Dartmouth Atlas based on Medicare patient referral patterns.
      Click a county row to view its detailed data.
    </p>`;

  // Render into rate-cards area (reuse the container)
  document.getElementById('rate-cards').innerHTML = html;

  // Hide charts that don't apply to HRR view
  const chartSections = document.querySelectorAll('#results-panel .chart-section');
  chartSections.forEach(s => s.classList.add('hidden'));

  // Add click handlers on county rows to drill into individual county
  document.querySelectorAll('[data-hrr-county]').forEach(row => {
    row.addEventListener('click', () => {
      const name = row.dataset.hrrCounty;
      // Switch to county view and load that county
      switchView('county');
      document.getElementById('county-input').value = name + ' County';
      loadCountyData(name);
    });
  });
}

// ============ Summary Data (for scatter plot + map) ============

async function loadSummaryData() {
  try {
    const response = await fetch('/data/access-explorer/_summary.json');
    if (response.ok) {
      summaryData = await response.json();
      initMap();
    }
  } catch (e) {
    // Summary data is optional; scatter plot and map won't render without it
  }
}

// ============ Affordability Rendering ============

function renderAffordability(data) {
  const aff = data.affordability;
  if (!aff) return;

  renderCostCards(aff);
  renderInsightCallout(data.county, aff, data);
  renderScatterPlot(data.county);
}

function renderCostCards(aff) {
  const container = document.getElementById('cost-cards');

  const cards = [
    {
      value: aff.composite_cost_index,
      label: 'Practice Cost Index',
      weight: 'State avg = 100',
      colorFn: v => v > 110 ? 'cost-high' : v > 90 ? 'cost-medium' : 'cost-low'
    },
    {
      value: aff.wage_index,
      label: 'Healthcare Wages',
      weight: '56% of composite',
      colorFn: v => v > 110 ? 'cost-high' : v > 90 ? 'cost-medium' : 'cost-low'
    },
    {
      value: aff.rent_index,
      label: 'Facility Rent',
      weight: '30% of composite',
      colorFn: v => v > 110 ? 'cost-high' : v > 90 ? 'cost-medium' : 'cost-low'
    },
    {
      value: aff.effective_reimbursement_index,
      label: 'Effective Reimbursement',
      weight: 'Purchasing power of flat payment',
      // Inverted: low effective reimbursement = bad for providers
      colorFn: v => v > 110 ? 'cost-low' : v > 90 ? 'cost-medium' : 'cost-high'
    }
  ];

  container.innerHTML = cards.map(card => `
    <div class="cost-card">
      <div class="cost-value ${card.colorFn(card.value)}">${card.value}</div>
      <div class="cost-label">${card.label}</div>
      <div class="cost-weight">${card.weight}</div>
    </div>
  `).join('');
}

function renderInsightCallout(countyName, aff, data) {
  const el = document.getElementById('cost-insight');
  const composite = aff.composite_cost_index;
  const effReimb = aff.effective_reimbursement_index;
  const purchasingPower = Math.round(effReimb);

  const aboveBelow = composite > 100 ? 'more' : 'less';
  const pctDiff = Math.abs(composite - 100).toFixed(0);

  // Compute overall participation rate
  let totalReg = 0, totalAct = 0;
  SPECIALTY_ORDER.forEach(key => {
    if (data.specialties[key]) {
      totalReg += data.specialties[key].registered;
      totalAct += data.specialties[key].active;
    }
  });
  const overallRate = totalReg > 0 ? (totalAct / totalReg * 100).toFixed(1) : 'N/A';

  let text;

  if (composite > 100) {
    // High-cost county
    text = `Running a medical practice in <strong>${countyName} County</strong> costs ` +
      `<strong>${pctDiff}% ${aboveBelow}</strong> than the state average, mostly because of ` +
      `higher wages and rent. But Medi-Cal pays providers here the same flat rate it pays in ` +
      `the cheapest parts of the state. That means every <strong>$100 in Medi-Cal payments ` +
      `only covers about $${purchasingPower}</strong> of what it actually costs to run a ` +
      `practice here.`;

    if (aff.medicare_gap_pct != null && aff.medicare_gap_pct > 0) {
      text += ` For comparison, Medicare recognizes this cost difference and pays ` +
        `${aff.medicare_gap_pct.toFixed(1)}% more in ${countyName} than its national base rate.`;
    }

    text += `<br><br>This gap helps explain why only <strong>${overallRate}%</strong> of ` +
      `licensed providers in ${countyName} County accept Medi-Cal patients.`;
  } else if (composite < 95) {
    // Low-cost county
    text = `Running a medical practice in <strong>${countyName} County</strong> costs ` +
      `<strong>${pctDiff}% ${aboveBelow}</strong> than the state average. ` +
      `That means Medi-Cal's flat statewide rate goes further here: every <strong>$100 in ` +
      `Medi-Cal payments is worth about $${purchasingPower}</strong> in local purchasing power.`;

    if (aff.medicare_gap_pct != null && aff.medicare_gap_pct < 0) {
      text += ` Medicare reflects this by paying ${Math.abs(aff.medicare_gap_pct).toFixed(1)}% ` +
        `less than its national base rate in ${countyName}.`;
    }

    text += `<br><br>The favorable cost environment may contribute to the county's ` +
      `<strong>${overallRate}%</strong> provider participation rate.`;
  } else {
    // Near-average county
    text = `Practice operating costs in <strong>${countyName} County</strong> are close to ` +
      `the state average, so Medi-Cal's flat statewide rate lines up reasonably well with ` +
      `local costs. Every <strong>$100 in Medi-Cal payments is worth about ` +
      `$${purchasingPower}</strong> in local purchasing power.`;

    text += `<br><br><strong>${overallRate}%</strong> of licensed providers in ` +
      `${countyName} County accept Medi-Cal patients.`;
  }

  text += '<br><br><em style="font-size: 0.75rem; color: #666;">Cost index weights follow the ' +
    'Medicare PE GPCI structure (56% wages, 30% rent, 14% purchased services). ' +
    '<a href="#about-section" style="color: #666; text-decoration: underline;">Learn more about the methodology.</a></em>';

  el.innerHTML = text;
  el.classList.remove('hidden');

  // Hide the old medicare-comparison box (content now integrated above)
  const mcEl = document.getElementById('medicare-comparison');
  if (mcEl) mcEl.classList.add('hidden');
}

function renderScatterPlot(currentCounty) {
  if (!summaryData || !summaryData.counties) return;

  const ctx = document.getElementById('scatter-chart').getContext('2d');
  const counties = summaryData.counties;

  // Build data points
  const points = [];
  const labels = [];
  const colors = [];
  const sizes = [];

  Object.entries(counties).forEach(([name, d]) => {
    if (d.composite_cost_index == null || d.participationRate == null) return;

    points.push({ x: d.composite_cost_index, y: d.participationRate });
    labels.push(name);

    const isCurrent = name === currentCounty;
    colors.push(isCurrent ? '#C62828' : 'rgba(21, 101, 192, 0.5)');
    sizes.push(isCurrent ? 8 : 4);
  });

  if (scatterChart) scatterChart.destroy();

  scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'CA Counties',
        data: points,
        backgroundColor: colors,
        borderColor: colors.map(c => c.replace('0.5', '0.8')),
        borderWidth: 1,
        pointRadius: sizes,
        pointHoverRadius: sizes.map(s => s + 2),
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              const idx = context.dataIndex;
              const name = labels[idx];
              const x = context.parsed.x;
              const y = context.parsed.y;
              return `${name}: ${y}% participation, cost index ${x}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Practice Cost Index (state avg = 100)',
            font: { size: 11 }
          },
          min: 60,
          max: 200,
          grid: { color: 'rgba(0,0,0,0.05)' }
        },
        y: {
          title: {
            display: true,
            text: 'Medicaid Participation Rate (%)',
            font: { size: 11 }
          },
          min: 0,
          max: 55,
          grid: { color: 'rgba(0,0,0,0.05)' }
        }
      }
    },
    plugins: [{
      // Reference lines plugin
      id: 'refLines',
      beforeDraw(chart) {
        const { ctx, scales: { x, y } } = chart;

        // Vertical line at x=100 (state average)
        const x100 = x.getPixelForValue(100);
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 1;
        ctx.moveTo(x100, y.top);
        ctx.lineTo(x100, y.bottom);
        ctx.stroke();
        ctx.restore();

        // Label
        ctx.save();
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('State avg', x100, y.top - 4);
        ctx.restore();
      }
    }]
  });
}

// ============ Specialty Rankings Panel ============

function computeSpecialtyStats(specialty) {
  if (!summaryData || !summaryData.counties) return null;

  let totalRegistered = 0;
  let totalActive = 0;
  const rankings = [];
  const deserts = [];

  Object.entries(summaryData.counties).forEach(([name, countyData]) => {
    const specData = countyData.specialties?.[specialty];
    if (!specData) {
      // County has no data for this specialty — treat as desert
      deserts.push({ name, reason: 'no_data' });
      rankings.push({ name, rate: null, active: 0, registered: 0, gap: 0 });
      return;
    }

    const reg = specData.registered || 0;
    const act = specData.active || 0;
    const rate = specData.participationRate;
    const gap = reg - act;

    totalRegistered += reg;
    totalActive += act;
    rankings.push({ name, rate, active: act, registered: reg, gap });

    if (act === 0 && reg > 0) {
      deserts.push({ name, reason: 'zero_active', registered: reg });
    } else if (rate != null && rate < 20 && reg > 0) {
      deserts.push({ name, reason: 'low_rate', rate, active: act, registered: reg });
    }
  });

  const stateRate = totalRegistered > 0
    ? parseFloat((totalActive / totalRegistered * 100).toFixed(1))
    : 0;

  return { totalRegistered, totalActive, stateRate, deserts, rankings };
}

function renderSpecialtyRankings(specialty) {
  const panel = document.getElementById('specialty-rankings');
  if (!panel) return;

  // Hide panel for "all" or when no summary data
  if (specialty === 'all' || !summaryData) {
    panel.classList.add('hidden');
    return;
  }

  const stats = computeSpecialtyStats(specialty);
  if (!stats) {
    panel.classList.add('hidden');
    return;
  }

  const label = SPECIALTY_LABEL_MAP[specialty] || specialty;

  // Title
  document.getElementById('rankings-title').textContent =
    label + ' Participation by County';

  // Summary stats
  document.getElementById('rankings-summary').innerHTML = `
    <div class="summary-stat">
      <div class="stat-number">${stats.totalRegistered.toLocaleString()}</div>
      <div class="stat-desc">Statewide Registered</div>
    </div>
    <div class="summary-stat">
      <div class="stat-number">${stats.totalActive.toLocaleString()}</div>
      <div class="stat-desc">Statewide Active</div>
    </div>
    <div class="summary-stat">
      <div class="stat-number ${getRateClass(stats.stateRate)}">${stats.stateRate}%</div>
      <div class="stat-desc">Statewide Rate</div>
    </div>
  `;

  // Desert alerts
  const alertsEl = document.getElementById('desert-alerts');
  if (stats.deserts.length > 0) {
    alertsEl.innerHTML = stats.deserts.map(d => {
      if (d.reason === 'zero_active') {
        return `<div class="desert-alert">
          <strong>${d.name}:</strong>&nbsp;0 active ${label} providers out of ${d.registered} registered
        </div>`;
      } else if (d.reason === 'low_rate') {
        return `<div class="desert-alert warning">
          <strong>${d.name}:</strong>&nbsp;${d.rate}% participation (${d.active} of ${d.registered})
        </div>`;
      }
      return '';
    }).join('');
  } else {
    alertsEl.innerHTML = '';
  }

  // Sort and render table
  rankingsSortColumn = 'rate';
  rankingsSortAsc = true;
  renderRankingsTable(stats.rankings);

  // Init sort headers
  initRankingsSort(stats.rankings);

  panel.classList.remove('hidden');

  // Announce to screen readers
  announceToScreenReader(`${label} rankings: ${stats.stateRate}% statewide rate. ${stats.deserts.length} access desert${stats.deserts.length !== 1 ? 's' : ''} identified.`);
}

function renderRankingsTable(rankings) {
  const sorted = [...rankings].sort((a, b) => {
    let aVal, bVal;
    switch (rankingsSortColumn) {
      case 'name': aVal = a.name; bVal = b.name; break;
      case 'rate': aVal = a.rate ?? -1; bVal = b.rate ?? -1; break;
      case 'active': aVal = a.active; bVal = b.active; break;
      case 'registered': aVal = a.registered; bVal = b.registered; break;
      case 'gap': aVal = a.gap; bVal = b.gap; break;
      default: aVal = a.rate ?? -1; bVal = b.rate ?? -1;
    }
    if (rankingsSortColumn === 'name') {
      return rankingsSortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return rankingsSortAsc ? aVal - bVal : bVal - aVal;
  });

  const tbody = document.getElementById('rankings-body');
  tbody.innerHTML = sorted.map(row => {
    const rateDisplay = row.rate != null ? row.rate + '%' : 'N/A';
    const rateClass = row.rate != null ? getRateClass(row.rate) : '';
    return `<tr>
      <td class="county-link" data-rankings-county="${row.name}">${row.name}</td>
      <td class="${rateClass}" style="font-weight: 600; text-align: right;">${rateDisplay}</td>
      <td style="text-align: right;">${row.active.toLocaleString()}</td>
      <td style="text-align: right;">${row.registered.toLocaleString()}</td>
      <td style="text-align: right;">${row.gap.toLocaleString()}</td>
    </tr>`;
  }).join('');

  // Click county name to load detail
  tbody.querySelectorAll('[data-rankings-county]').forEach(td => {
    td.addEventListener('click', () => {
      const name = td.dataset.rankingsCounty;
      document.getElementById('county-input').value = name + ' County';
      document.getElementById('specialty-rankings').classList.add('hidden');
      loadCountyData(name);
    });
  });

  // Update header arrows
  document.querySelectorAll('#rankings-table th[data-sort]').forEach(th => {
    th.classList.toggle('sort-active', th.dataset.sort === rankingsSortColumn);
    // Reset all header text
    const col = th.dataset.sort;
    const labels = { name: 'County', rate: 'Rate', active: 'Active', registered: 'Registered', gap: 'Phantom Gap' };
    const arrow = th.dataset.sort === rankingsSortColumn
      ? (rankingsSortAsc ? ' \u25B2' : ' \u25BC')
      : '';
    th.textContent = labels[col] + arrow;
  });
}

function initRankingsSort(rankings) {
  document.querySelectorAll('#rankings-table th[data-sort]').forEach(th => {
    // Remove old listeners by cloning
    const newTh = th.cloneNode(true);
    th.parentNode.replaceChild(newTh, th);
    newTh.setAttribute('tabindex', '0');
    newTh.setAttribute('role', 'columnheader');
    newTh.setAttribute('aria-sort', newTh.dataset.sort === rankingsSortColumn ? (rankingsSortAsc ? 'ascending' : 'descending') : 'none');

    function handleSort() {
      const col = newTh.dataset.sort;
      if (rankingsSortColumn === col) {
        rankingsSortAsc = !rankingsSortAsc;
      } else {
        rankingsSortColumn = col;
        rankingsSortAsc = col === 'name' ? true : true;
      }
      renderRankingsTable(rankings);
    }

    newTh.addEventListener('click', handleSort);
    newTh.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSort();
      }
    });
  });
}

// Add suggestion styling
const accessStyle = document.createElement('style');
accessStyle.textContent = `
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
document.head.appendChild(accessStyle);
