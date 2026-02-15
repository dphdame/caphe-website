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

let currentCountyData = null;
let currentSpecialty = 'all';
let barChart = null;
let trendChart = null;
let scatterChart = null;
let summaryData = null;

document.addEventListener('DOMContentLoaded', () => {
  initCountyAutocomplete();
  initSpecialtyTabs();
  initDownload();
  loadSummaryData();
});

// ============ County Autocomplete ============

function initCountyAutocomplete() {
  const input = document.getElementById('county-input');
  const suggestionsDiv = document.getElementById('county-suggestions');

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().replace(' county', '');

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

      suggestionsDiv.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
          const county = item.dataset.county;
          input.value = `${county} County`;
          suggestionsDiv.style.display = 'none';
          loadCountyData(county);
        });
      });
    } else {
      suggestionsDiv.innerHTML = '<div class="suggestion-item" style="color: var(--color-text-muted);">No matching counties</div>';
      suggestionsDiv.style.display = 'block';
    }
  });

  // Allow Enter key to select first match
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const firstMatch = suggestionsDiv.querySelector('.suggestion-item[data-county]');
      if (firstMatch) {
        firstMatch.click();
      } else {
        // Try exact match
        const query = input.value.toLowerCase().replace(' county', '');
        const match = CALIFORNIA_COUNTIES.find(c => c.toLowerCase() === query);
        if (match) {
          input.value = `${match} County`;
          suggestionsDiv.style.display = 'none';
          loadCountyData(match);
        }
      }
    }
  });

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

  try {
    const response = await fetch(`/data/access-explorer/${fileName}.json`);
    if (!response.ok) {
      throw new Error(`Data not available for ${countyName} County`);
    }

    currentCountyData = await response.json();
    currentSpecialty = 'all';

    // Reset specialty tabs
    document.querySelectorAll('.specialty-tab').forEach(tab => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    });
    document.querySelector('.specialty-tab[data-specialty="all"]').classList.add('active');
    document.querySelector('.specialty-tab[data-specialty="all"]').setAttribute('aria-selected', 'true');

    // Show results
    document.getElementById('results-placeholder').classList.add('hidden');
    document.getElementById('results-panel').classList.remove('hidden');
    document.getElementById('specialty-section').classList.remove('hidden');

    renderResults();

  } catch (error) {
    document.getElementById('results-placeholder').classList.remove('hidden');
    document.getElementById('results-panel').classList.add('hidden');

    const placeholder = document.getElementById('results-placeholder');
    placeholder.innerHTML = `
      <h3 style="color: var(--color-warning);">Data Not Yet Available</h3>
      <p>${countyName} County data is not yet loaded. The full dataset covering all 58 counties will be available after the data processing pipeline runs.</p>
      <p style="margin-top: var(--space-sm); font-size: 0.8rem;">Currently available: Los Angeles, Fresno, Imperial counties (demo data).</p>
    `;
  }
}

// ============ Rendering ============

function renderResults() {
  if (!currentCountyData) return;

  renderSummaryStats();
  renderRateCards();
  renderBarChart();
  renderTrendChart();
  renderAlerts();

  // Affordability section
  const affSection = document.getElementById('affordability-section');
  if (currentCountyData.affordability) {
    affSection.classList.remove('hidden');
    renderAffordability(currentCountyData);
  } else {
    affSection.classList.add('hidden');
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

    html += `
      <div class="rate-card${isActive}" data-specialty="${key}" tabindex="0" role="button" aria-label="${spec.label}: ${spec.participationRate}% participation rate">
        <div class="rate-label">${spec.label}</div>
        <div class="rate-value ${rateClass}">${spec.participationRate}%</div>
        <div class="rate-change ${changeClass}">${changeSign}${spec.changeFrom2019}pp from 2019</div>
        <div class="phantom-bar">
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

  // Update tab states
  document.querySelectorAll('.specialty-tab').forEach(tab => {
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

// ============ Summary Data (for scatter plot) ============

async function loadSummaryData() {
  try {
    const response = await fetch('/data/access-explorer/_summary.json');
    if (response.ok) {
      summaryData = await response.json();
    }
  } catch (e) {
    // Summary data is optional; scatter plot won't render without it
  }
}

// ============ Affordability Rendering ============

function renderAffordability(data) {
  const aff = data.affordability;
  if (!aff) return;

  renderCostCards(aff);
  renderInsightCallout(data.county, aff, data);
  renderMedicareComparison(data.county, aff);
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
  const wageIdx = aff.wage_index;
  const rentIdx = aff.rent_index;

  const aboveBelow = composite > 100 ? 'above' : 'below';
  const pctDiff = Math.abs(composite - 100).toFixed(0);
  const purchasingPower = (effReimb / 100 * 100).toFixed(0);

  let text = `In <strong>${countyName} County</strong>, healthcare operating costs are ` +
    `<strong>${pctDiff}% ${aboveBelow}</strong> the state average. ` +
    `A flat $100 Medi-Cal payment has the purchasing power of <strong>$${purchasingPower}</strong> here. ` +
    `Healthcare workers earn ${wageIdx}% of the state average wage`;

  if (rentIdx != null) {
    text += `, and facility rent is ${rentIdx}% of the state average`;
  }
  text += '.';

  // Add penalty note for high-cost counties
  if (effReimb < 90) {
    // Compute overall participation rate
    let totalReg = 0, totalAct = 0;
    SPECIALTY_ORDER.forEach(key => {
      if (data.specialties[key]) {
        totalReg += data.specialties[key].registered;
        totalAct += data.specialties[key].active;
      }
    });
    const overallRate = totalReg > 0 ? (totalAct / totalReg * 100).toFixed(1) : 'N/A';
    const penalty = (100 - effReimb).toFixed(0);

    text += `<br><br>Providers in ${countyName} County face a <strong>${penalty}% effective ` +
      `reimbursement penalty</strong> compared to the state average, which may contribute ` +
      `to the county's ${overallRate}% provider participation rate.`;
  }

  text += '<br><br><em style="font-size: 0.75rem; color: #666;">Composite weights follow the Medicare ' +
    'PE GPCI structure (CMS CY 2026 PFS, 90 FR 49266).</em>';

  el.innerHTML = text;
  el.classList.remove('hidden');
}

function renderMedicareComparison(countyName, aff) {
  const el = document.getElementById('medicare-comparison');

  if (aff.medicare_gap_pct == null) {
    el.classList.add('hidden');
    return;
  }

  const gap = aff.medicare_gap_pct;
  const direction = gap >= 0 ? 'increases' : 'decreases';
  const absGap = Math.abs(gap).toFixed(1);

  el.innerHTML = `<strong>Medicare Geographic Comparison:</strong> Medicare adjusts physician ` +
    `payments geographically through the Geographic Practice Cost Index (GPCI), mandated by ` +
    `Congress in 1989 (OBRA 89). In ${countyName} County, Medicare's geographic adjustment ` +
    `${direction} payments by <strong>${absGap}%</strong> ${gap >= 0 ? 'above' : 'below'} ` +
    `the national standardized rate. <strong>Medi-Cal applies no such geographic adjustment</strong> ` +
    `&mdash; a provider in ${countyName} receives the same fee schedule rate as one in any ` +
    `other California county.`;

  el.classList.remove('hidden');
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
