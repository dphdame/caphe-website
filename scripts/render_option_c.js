#!/usr/bin/env node
/**
 * Shared Option C Two-Table 30-60s Executive Case Study Renderer for CAPHE Methods Lab
 * Enforces all CAPHE v231-v233 + Open Public Access + Visual Ease & Line-Break Standards:
 * - Open public access (no login gates)
 * - Title <= 60 chars
 * - Answer block 40-90 words
 * - Canonical === og:url
 * - Zero em-dashes in generated HTML
 * - >= 4 external https:// links in body
 * - Article/LearningResource + FAQPage (>= 3 questions) JSON-LD
 * - Stacked Ruler headers + unclipped segment legend pills + two-deck Table 1 cells + text-wrap: balance/pretty
 */

const fs = require('fs');
const path = require('path');

function countWords(htmlStr) {
  const plain = htmlStr.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return plain ? plain.split(' ').length : 0;
}

const SEG_DOT_COLORS = {
  'seg-rent': '#BE123C',
  'seg-Housing': '#BE123C',
  'seg-food': '#F59E0B',
  'seg-rest': '#0F766E',
  'seg-gross': '#475569',
  'seg-primary': '#0041A5'
};

function stripVisibleModeTag(inputStr) {
  if (!inputStr) return '';
  return String(inputStr)
    .replace(/\(\s*Mode\s+[AB]\b[^)]*\)/gi, '')
    .replace(/\bMode\s+[AB]\s+Worker\s+Wage\s+Tier:\s*/gi, 'Wage Tier ')
    .replace(/\bMode\s+[AB]\s+on\s+Observed\s+Pop\b/gi, 'Observed Pop')
    .replace(/\bMode\s+[AB]\s+Scenario:\s*/gi, '')
    .replace(/\bMode\s+[AB]\s*:\s*Bucket\s+A\b/gi, 'Group 1')
    .replace(/\bMode\s+[AB]\s*:\s*Buckets\s+B-D\b/gi, 'Group 2')
    .replace(/\bMode\s+[AB]\s*:\s*Buckets\s+E-G\b/gi, 'Group 3')
    .replace(/\bMode\s+[AB]\s*:\s*Bucket\s+H\b/gi, 'Group 4')
    .replace(/\bMode\s+[AB]\s*:\s*/gi, '')
    .replace(/\bMode\s+[AB]\s+county-scaled\b/gi, 'County-scaled')
    .replace(/\bMode\s+[AB]\s+calibrated\b/gi, 'Calibrated')
    .replace(/\bMode\s+[AB]\s+counterfactual\b/gi, 'Modeled comparison')
    .replace(/\bMode\s+[AB]\b/gi, '')
    .replace(/^California Case\s*(?:\([^)]*\))?\s*:\s*/i, '')
    .replace(/^Medicaid Case\s*(?:\([^)]*\))?\s*:\s*/i, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function simplifyToGrade7(inputStr) {
  if (!inputStr) return '';
  // Split by HTML tags (preserving <a ...>...</a> blocks verbatim so citation labels and proper nouns are never altered)
  return String(inputStr).split(/(<a\b[^>]*>[\s\S]*?<\/a>|<[^>]+>)/gi).map(part => {
    if (part.startsWith('<')) return part;
    return part
      // Plain-English vocabulary replacements (safe A7 allowlist)
      .replace(/\bReimbursements\b/g, 'Payments')
      .replace(/\breimbursements\b/g, 'payments')
      .replace(/\bReimbursement\b/g, 'Pay')
      .replace(/\breimbursement\b/g, 'pay')
      .replace(/\bReimburses\b/g, 'Pays')
      .replace(/\breimburses\b/g, 'pays')
      .replace(/\bReimbursed\b/g, 'Paid')
      .replace(/\breimbursed\b/g, 'paid')
      .replace(/\bUtilization\b/g, 'Use')
      .replace(/\butilization\b/g, 'use')
      .replace(/\bPreventable Hospitalizations\b/gi, 'Avoidable Hospital Stays')
      .replace(/\bHospitalizations\b/g, 'Hospital Stays')
      .replace(/\bhospitalizations\b/g, 'hospital stays')
      .replace(/\bHospitalization\b/g, 'Hospital Stay')
      .replace(/\bhospitalization\b/g, 'hospital stay')
      .replace(/\bInpatient\b/g, 'Hospital')
      .replace(/\binpatient\b/g, 'hospital')
      .replace(/\bEmergency Department\b/g, 'ER')
      .replace(/\bemergency department\b/g, 'ER')
      .replace(/\bUncompensated\b/g, 'Unpaid')
      .replace(/\buncompensated\b/g, 'unpaid')
      .replace(/\bBeneficiaries\b/g, 'Members')
      .replace(/\bbeneficiaries\b/g, 'members')
      .replace(/\bBeneficiary\b/g, 'Member')
      .replace(/\bbeneficiary\b/g, 'member')
      .replace(/\bEnrollees\b/g, 'Members')
      .replace(/\benrollees\b/g, 'members')
      .replace(/\bEnrollee\b/g, 'Member')
      .replace(/\benrollee\b/g, 'member')
      .replace(/\bEmpaneled\b/g, 'Regular')
      .replace(/\bempaneled\b/g, 'regular')
      .replace(/\bHigh-Acuity\b/g, 'High-Need')
      .replace(/\bhigh-acuity\b/g, 'high-need')
      .replace(/\bheteroskedasticity-based\b/gi, 'variance-based')
      .replace(/\bheteroskedastic\b/gi, 'variance-based')
      .replace(/\bHeteroskedasticity\b/g, 'Residual Variance')
      .replace(/\bheteroskedasticity\b/g, 'residual variance')
      .replace(/\bMultiplicity Control\b/gi, 'Multiple-Group Check')
      .replace(/\bMultiplicity\b/g, 'Multiple Testing')
      .replace(/\bmultiplicity\b/g, 'multiple testing')
      .replace(/\bTrajectories\b/g, 'Trends')
      .replace(/\btrajectories\b/g, 'trends')
      .replace(/\bTrajectory\b/g, 'Trend')
      .replace(/\btrajectory\b/g, 'trend')
      .replace(/\bLongitudinal\b/g, 'Multi-Year')
      .replace(/\blongitudinal\b/g, 'multi-year')
      .replace(/\bCross-Sectional\b/g, 'Single-Year')
      .replace(/\bcross-sectional\b/g, 'single-year')
      .replace(/\bInterventions\b/g, 'Programs')
      .replace(/\binterventions\b/g, 'programs')
      .replace(/\bIntervention\b/g, 'Program')
      .replace(/\bintervention\b/g, 'program')
      .replace(/\bJurisdictions\b/g, 'Counties')
      .replace(/\bjurisdictions\b/g, 'counties')
      .replace(/\bJurisdiction\b/g, 'County')
      .replace(/\bjurisdiction\b/g, 'county')
      .replace(/\bSubpopulations\b/g, 'Groups')
      .replace(/\bsubpopulations\b/g, 'groups')
      .replace(/\bSubpopulation\b/g, 'Group')
      .replace(/\bsubpopulation\b/g, 'group')
      .replace(/\bProcurement\b/g, 'Contracting')
      .replace(/\bprocurement\b/g, 'contracting')
      .replace(/\bAllocations\b/g, 'Funding')
      .replace(/\ballocations\b/g, 'funding')
      .replace(/\bAllocation\b/g, 'Funding')
      .replace(/\ballocation\b/g, 'funding')
      .replace(/\bApproximately\b/g, 'About')
      .replace(/\bapproximately\b/g, 'about')
      .replace(/\bConsequently\b/g, 'So')
      .replace(/\bconsequently\b/g, 'so')
      .replace(/\bSubsequently\b/g, 'Later')
      .replace(/\bsubsequently\b/g, 'later')
      .replace(/\bSimultaneously\b/g, 'At once')
      .replace(/\bsimultaneously\b/g, 'at once')
      .replace(/\bDisproportionately\b/g, 'Heavily')
      .replace(/\bdisproportionately\b/g, 'heavily')
      .replace(/\bAll-Cause Mortality\b/g, 'Overall Deaths')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\ball-cause mortality\b/g, 'overall deaths')
      .replace(/\bPremature Mortality\b/g, 'Early Deaths')
      .replace(/\bpremature mortality\b/g, 'early deaths')
      .replace(/\bHigh-Mortality\b/g, 'High-Death-Rate')
      .replace(/\bhigh-mortality\b/g, 'high-death-rate')
      .replace(/\bMortality Prevention\b/g, 'Preventing Early Deaths')
      .replace(/\bmortality prevention\b/g, 'preventing early deaths')
      .replace(/\bMortality Effect\b/g, 'Avoidable Death Reduction')
      .replace(/\bmortality effect\b/g, 'avoidable death reduction')
      .replace(/\bmortality valuations\b/gi, 'valuations of lives saved')
      .replace(/\bmortality spikes\b/gi, 'death spikes')
      .replace(/\bNavigation\b/g, 'Outreach')
      .replace(/\bnavigation\b/g, 'outreach')
      .replace(/\bNavigator\b/g, 'Helper')
      .replace(/\bnavigator\b/g, 'helper')
      .replace(/\bInfrastructure\b/g, 'Systems')
      .replace(/\binfrastructure\b/g, 'systems')
      .replace(/\bAppropriations\b/g, 'Budgets')
      .replace(/\bappropriations\b/g, 'budgets')
      .replace(/\bOveridentification\b/g, 'Model Check')
      .replace(/\boveridentification\b/g, 'model check')
      .replace(/\bCardiometabolic\b/g, 'Heart and diabetes')
      .replace(/\bcardiometabolic\b/g, 'heart and diabetes')
      .replace(/\bProximity\b/g, 'Distance')
      .replace(/\bproximity\b/g, 'distance')
      .replace(/\bMedications\b/g, 'Medicines')
      .replace(/\bmedications\b/g, 'medicines')
      .replace(/\bMedication\b/g, 'Medicine')
      .replace(/\bmedication\b/g, 'medicine')
      .replace(/\beducational attainment\b/gi, 'schooling')
      .replace(/\(population\s+([0-9,]+)\)/gi, '($1 residents)')
      .replace(/\bUnadjusted Observational Correlation\b/gi, 'Raw Yearly Average')
      .replace(/\bSimultaneous OLS Association\b/gi, 'Raw Yearly Average')
      .replace(/\bUnadjusted Panel OLS\b/gi, 'Raw Yearly Average')
      .replace(/\bUnadjusted OLS\b/gi, 'Raw Yearly Average')
      .replace(/\bQuasi-Experimental Instrumental Variables\b/gi, 'Routine-Budget Analysis')
      .replace(/\bQuasi-experimental Instrumental Variables \(IV\)/gi, 'Routine-budget analysis')
      .replace(/\bInstrumental Variables Isolation\b/gi, 'Routine-Budget Analysis')
      .replace(/\bInstrumental Variables \(IV\)/gi, 'Routine-Budget Analysis')
      .replace(/\bInstrumental variables\b/gi, 'Routine-budget models')
      .replace(/\bQuasi-Experimental\b/gi, 'Real-World')
      .replace(/\bquasi-experimental\b/gi, 'real-world')
      .replace(/\bLewbel \(2012\) heteroskedastic IV\b/gi, '21-Year County Budget Model')
      .replace(/\bLewbel higher-moment IV\b/gi, '21-Year County Budget Model')
      .replace(/\bLewbel IV\b/gi, '21-Year Budget Model')
      .replace(/\bCalifornian fiscal governance IV\b/gi, 'County Board Budget Rules')
      .replace(/\bValidated county governance IV\b/gi, 'County board rule comparison')
      .replace(/\bWhen RCTs Are Impossible\b/gi, 'for County Budget Decisions')
      .replace(/\bSolves the Ethics Barrier to Public Health RCTs\b/gi, 'Builds Confidence for County Budget Decisions')
      .replace(/\bCross-Method Replication\b/g, 'Two Independent Checks')
      .replace(/\bcross-method replication\b/g, 'two independent checks')
      .replace(/\bHow the Design Handles Endogeneity\b/gi, 'How Outbreak Spending Is Handled')
      .replace(/\bEndogenous \+ needs-driven budgets\b/gi, 'Routine + outbreak budgets mixed')
      .replace(/\bno instrument \(endogenous OLS\)/gi, 'No adjustment for outbreak surges')
      .replace(/\bEndogeneity\b/g, 'Outbreak Spending Mix')
      .replace(/\bendogeneity\b/g, 'outbreak spending mix')
      .replace(/\bEndogenous\b/g, 'Needs-Driven')
      .replace(/\bendogenous\b/g, 'needs-driven')
      .replace(/\bExogenous\b/g, 'Routine')
      .replace(/\bexogenous\b/g, 'routine')
      .replace(/\bInstrument Strength &amp; (?:Overidentification|Model Check)\b/gi, 'Method Reliability Check')
      .replace(/\bInstrument Strength\b/gi, 'Method Reliability')
      .replace(/\bInterrupted Time Series\b/gi, 'Multi-Year Trend Split')
      .replace(/\bDifference-in-Differences\b/gi, 'Side-by-Side Group Comparison')
      .replace(/\bPre-Trend F-test\b/gi, 'pre-policy trend check')
      .replace(/\bfalse-discovery-rate control\b/gi, 'multiple-group reliability check')
      .replace(/\bFalse Discoveries\b/gi, 'Small-Group Swings')
      .replace(/\bp-Hacking\b/gi, 'Cherry-Picking')
      .replace(/\bMediators\b/g, 'Program Steps')
      .replace(/\bmediators\b/g, 'program steps')
      .replace(/\bMediator\b/g, 'Program Step')
      .replace(/\bmediator\b/g, 'program step')
      .replace(/\bselection gates\b/gi, 'filters')
      .replace(/\bselection gate\b/gi, 'filter')
      .replace(/\bmorbidity gains\b/gi, 'health improvements')
      .replace(/(?:\b5-year\s+)?\bKoyck(?:\s+geometric)?(?:\s+distributed)?\s+lag\b/gi, '5-year phase-in schedule')
      .replace(/\bhierarchy of evidence\b/gi, 'study-design toolkit')
      .replace(/\bFirefighters at Fires\b/gi, 'Outbreak Budget Surge')
      .replace(/\bMonte Carlo PSA\b/gi, '1,000-Scenario Check')
      .replace(/\bArea Deprivation Index \(ADI\)/gi, 'Neighborhood Need Index')
      .replace(/\bCompletely\s+/g, '')
      .replace(/\bcompletely\b\s+/g, '')
      .replace(/\bSpecifically\s+/g, '')
      .replace(/\bspecifically\b\s+/g, '')
      // Replace algebraic minus-sign shorthand on event/count nouns (e.g. "-9.16 deaths" -> "9.16 fewer deaths")
      .replace(/(^|[\s(])-(\d+(?:,\d+)*(?:\.\d+)?)\s+(deaths|cases|stays|visits|ED|ER|hospital stays|readmissions)\b/gi, '$1$2 fewer $3')
      .replace(/,?\s+rather than\s+/gi, ' instead of ')
      .replace(/Swipe horizontally to view all 4 columns/gi, 'Scroll side to side to see all 4 columns')
      .replace(/\bPreventable\b/g, 'Avoidable')
      .replace(/\bpreventable\b/g, 'avoidable')
      .replace(/\bQuantifying\b/g, 'Measuring')
      .replace(/\bquantifying\b/g, 'measuring')
      .replace(/\bQuantifies\b/g, 'Measures')
      .replace(/\bquantifies\b/g, 'measures')
      .replace(/\bMethodology\b/g, 'Method')
      .replace(/\bmethodology\b/g, 'method')
      .replace(/\bMetropolitan\b/g, 'Metro')
      .replace(/\bmetropolitan\b/g, 'metro')
      .replace(/\bMunicipalities\b/g, 'Cities')
      .replace(/\bmunicipalities\b/g, 'cities')
      .replace(/\bMunicipality\b/g, 'City')
      .replace(/\bmunicipality\b/g, 'city')
      .replace(/\bComprehensive\b/g, 'Full')
      .replace(/\bcomprehensive\b/g, 'full')
      .replace(/\bMandatory\b/g, 'Required')
      .replace(/\bmandatory\b/g, 'required')
      .replace(/\bRecruitment\b/g, 'Hiring')
      .replace(/\brecruitment\b/g, 'hiring')
      .replace(/\bAppointments\b/g, 'Visits')
      .replace(/\bappointments\b/g, 'visits')
      .replace(/\bAppointment\b/g, 'Visit')
      .replace(/\bappointment\b/g, 'visit')
      .replace(/\bCardiovascular\b/g, 'Heart')
      .replace(/\bcardiovascular\b/g, 'heart')
      .replace(/\bHypertension\b/g, 'High Blood Pressure')
      .replace(/\bhypertension\b/g, 'high blood pressure')
      .replace(/\bLimitations\b/g, 'Limits')
      .replace(/\blimitations\b/g, 'limits')
      .replace(/\bLimitation\b/g, 'Limit')
      .replace(/\blimitation\b/g, 'limit')
      .replace(/\bAdditionally\b/g, 'Also')
      .replace(/\badditionally\b/g, 'also')
      .replace(/\bFurthermore\b/g, 'Also')
      .replace(/\bfurthermore\b/g, 'also')
      .replace(/\bNevertheless\b/g, 'Still')
      .replace(/\bnevertheless\b/g, 'still');
  }).join('');
}

function formatTable1Cell(valStr, isHighlight = false, isBold = true, overflowNotes = null, rowLabel = '', colTitle = '') {
  const str = stripVisibleModeTag(simplifyToGrade7(String(valStr || '').trim()))
    .replace(/\bTWFE\b/g, 'County & Year FE')
    .replace(/\bOLS\b/g, 'Simple Avg')
    .replace(/\bFFS\b/g, 'Per-Visit')
    .replace(/\bNPIs\b/g, 'doctors')
    .replace(/\s*\/\s*mo\s+remaining\b/gi, '')
    .replace(/\s*\/\s*mo\b/gi, '')
    .replace(/\s+of\s+B\d{5}\b/gi, '');
  const formatSec = (s) => s.replace(/\s*\|\s*/g, ' &middot; ').trim();
  const trimCellSec = (s) => {
    const cleaned = formatSec(s);
    const words = cleaned.replace(/&middot;/g, ' ').split(/\s+/).filter(Boolean);
    if (words.length > 5 && overflowNotes) {
      overflowNotes.push(`<strong>${rowLabel} (${colTitle}).</strong> ${cleaned}.`);
      // Keep only the first segment before &middot; or first 4 words
      const firstSeg = cleaned.split(/\s*&middot;\s*|\s*,\s*|\s+in\s+|\s+across\s+|\s+at\s+/)[0].trim();
      const shortWords = firstSeg.split(/\s+/).filter(Boolean);
      return shortWords.length <= 5 ? firstSeg : shortWords.slice(0, 4).join(' ');
    }
    return cleaned;
  };
  const parenMatch = str.match(/^([^()]+?)\s*\(([^()]+)\)$/);
  if (parenMatch && parenMatch[1].trim().length >= 2) {
    const primary = parenMatch[1].trim();
    const secondary = trimCellSec(parenMatch[2].trim());
    const primaryCls = isHighlight
      ? 'block font-mono text-base sm:text-lg font-bold leading-snug'
      : `block font-mono text-sm sm:text-base ${isBold ? 'font-bold text-slate-950' : 'font-semibold text-slate-800'} leading-snug`;
    const secCls = isHighlight
      ? 'block font-sans text-xs font-semibold opacity-90 mt-0.5 leading-snug'
      : 'block font-sans text-xs font-normal text-slate-600 mt-0.5 leading-snug';
    return secondary
      ? `<span class="${primaryCls}">${primary}</span><span class="${secCls}">${secondary}</span>`
      : `<span class="${primaryCls}">${primary}</span>`;
  }
  const pipeParts = str.split(/\s+\|\s+/);
  if (pipeParts.length === 2) {
    const primaryCls = isHighlight
      ? 'block font-mono text-base sm:text-lg font-bold leading-snug'
      : `block font-mono text-sm sm:text-base ${isBold ? 'font-bold text-slate-950' : 'font-semibold text-slate-800'} leading-snug`;
    const secCls = isHighlight
      ? 'block font-sans text-xs font-semibold opacity-90 mt-0.5 leading-snug'
      : 'block font-sans text-xs font-normal text-slate-600 mt-0.5 leading-snug';
    const secondary = trimCellSec(pipeParts[1]);
    return `<span class="${primaryCls}">${pipeParts[0].trim()}</span><span class="${secCls}">${secondary}</span>`;
  }
  const singleCls = isHighlight
    ? 'block font-mono text-base sm:text-lg font-bold leading-snug'
    : `block font-mono text-sm sm:text-base ${isBold ? 'font-bold text-slate-950' : 'font-semibold text-slate-800'} leading-snug`;
  return `<span class="${singleCls}">${str}</span>`;
}

function formatTable1RowLabel(rawLabel, explicitModeled, rowCells = []) {
  const mainRaw = stripVisibleModeTag(simplifyToGrade7(String(rawLabel || '').replace(/<span[\s\S]*?<\/span>/gi, '').trim()));
  const isModeled = explicitModeled === true || /^Modeled\s+/i.test(mainRaw);
  let cleaned = mainRaw
    .replace(/^Modeled\s+/i, '')
    .replace(/^Observed\s+/i, '')
    .replace(/^Cost Input:\s*/i, '')
    .replace(/\s*\([^()]+\)\s*$/g, '')
    .trim();
  const hasMo = Array.isArray(rowCells) && rowCells.some(c => /\/\s*mo\b/i.test(String((c && c.val) || '')));
  if (hasMo && !/\b(Monthly|Month)\b/i.test(cleaned)) {
    cleaned = `Monthly ${cleaned}`;
  }
  const star = isModeled ? '<sup class="text-slate-500 font-bold ml-0.5" title="Modeled estimate">*</sup>' : '';
  return { html: `${cleaned}${star}`, cleanText: cleaned, isModeled };
}

function renderColumnBannerSvg(col, idx) {
  const titleLower = `${col.tag || ''} ${col.title || ''} ${col.subtitle || ''}`.toLowerCase();
  if (titleLower.includes('marin') || titleLower.includes('canal') || titleLower.includes('san francisco') || titleLower.includes('coastal') || titleLower.includes('bay area') || titleLower.includes('san mateo')) {
    return `<img src="/methods-lab/food-affordability-tradeoffs/assets/marin-canal.jpg" alt="Coastal California high-rent community context" class="col-header-img" height="68" loading="lazy">`;
  }
  if (titleLower.includes('fresno') || titleLower.includes('valley') || titleLower.includes('tulare') || titleLower.includes('kern') || titleLower.includes('merced')) {
    return `<img src="/methods-lab/food-affordability-tradeoffs/assets/fresno-valley.jpg" alt="Central Valley California community context" class="col-header-img" height="68" loading="lazy">`;
  }
  if (titleLower.includes('nevada') || titleLower.includes('sierra') || titleLower.includes('alpine') || titleLower.includes('modoc') || titleLower.includes('imperial') || titleLower.includes('rural') || titleLower.includes('inland')) {
    return `<img src="/methods-lab/food-affordability-tradeoffs/assets/nevada-sierra.jpg" alt="Rural California community context" class="col-header-img" height="68" loading="lazy">`;
  }
  if (titleLower.includes('santa clara') || titleLower.includes('alameda') || titleLower.includes('los angeles') || titleLower.includes('urban') || titleLower.includes('metro') || titleLower.includes('sacramento')) {
    return `<img src="/methods-lab/food-affordability-tradeoffs/assets/santa-clara-suburban.jpg" alt="Urban California metropolitan context" class="col-header-img" height="68" loading="lazy">`;
  }
  const diagrams = [
    // Col 0: Baseline Administrative Screen (Unadjusted Level Bars)
    `<svg width="100%" height="68" viewBox="0 0 200 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="68" rx="6" fill="#F1F5F9"/>
      <line x1="16" y1="54" x2="184" y2="54" stroke="#94A3B8" stroke-width="1.5"/>
      <line x1="16" y1="24" x2="184" y2="24" stroke="#64748B" stroke-width="1" stroke-dasharray="4 3"/>
      <rect x="28" y="30" width="26" height="24" rx="3" fill="#64748B" fill-opacity="0.45"/>
      <rect x="68" y="18" width="26" height="36" rx="3" fill="#0041A5" fill-opacity="0.75"/>
      <rect x="108" y="26" width="26" height="28" rx="3" fill="#64748B" fill-opacity="0.45"/>
      <rect x="148" y="14" width="26" height="40" rx="3" fill="#0041A5"/>
    </svg>`,
    // Col 1: Covariate / Trend Decomposition (Diverging Trajectories)
    `<svg width="100%" height="68" viewBox="0 0 200 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="68" rx="6" fill="#FFFBEB"/>
      <line x1="16" y1="54" x2="184" y2="54" stroke="#FCD34D" stroke-width="1.5"/>
      <path d="M22 46 L74 38 L126 30 L178 22" stroke="#94A3B8" stroke-width="2" stroke-dasharray="4 3" stroke-linecap="round"/>
      <path d="M22 46 L74 36 L126 18 L178 14" stroke="#D97706" stroke-width="3" stroke-linecap="round"/>
      <circle cx="22" cy="46" r="3.5" fill="#B45309"/>
      <circle cx="126" cy="18" r="4" fill="#D97706"/>
      <circle cx="178" cy="14" r="4.5" fill="#B45309"/>
    </svg>`,
    // Col 2: Policy Threshold / Funnel Conditioning (Cutoff & Split)
    `<svg width="100%" height="68" viewBox="0 0 200 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="68" rx="6" fill="#ECFDF5"/>
      <line x1="16" y1="54" x2="184" y2="54" stroke="#6EE7B7" stroke-width="1.5"/>
      <line x1="104" y1="10" x2="104" y2="56" stroke="#047857" stroke-width="2" stroke-dasharray="3 3"/>
      <rect x="24" y="20" width="68" height="12" rx="4" fill="#94A3B8" fill-opacity="0.5"/>
      <rect x="24" y="36" width="52" height="12" rx="4" fill="#64748B" fill-opacity="0.6"/>
      <rect x="114" y="16" width="62" height="14" rx="4" fill="#0D9488"/>
      <rect x="114" y="35" width="44" height="13" rx="4" fill="#047857" fill-opacity="0.8"/>
    </svg>`,
    // Col 3: Calibrated Economic / Causal Benchmark (Effect + Confidence Bounds)
    `<svg width="100%" height="68" viewBox="0 0 200 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="68" rx="6" fill="#F0FDFA"/>
      <rect x="96" y="10" width="84" height="44" rx="4" fill="#CCFBF1" fill-opacity="0.6"/>
      <line x1="16" y1="54" x2="184" y2="54" stroke="#5EEAD4" stroke-width="1.5"/>
      <line x1="36" y1="38" x2="82" y2="38" stroke="#64748B" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="59" cy="38" r="4.5" fill="#475569"/>
      <line x1="112" y1="26" x2="168" y2="26" stroke="#0F766E" stroke-width="3" stroke-linecap="round"/>
      <line x1="112" y1="20" x2="112" y2="32" stroke="#0F766E" stroke-width="2"/>
      <line x1="168" y1="20" x2="168" y2="32" stroke="#0F766E" stroke-width="2"/>
      <circle cx="140" cy="26" r="5.5" fill="#0F766E" stroke="#FFFFFF" stroke-width="1.5"/>
    </svg>`
  ];
  const borderColors = ['#BFDBFE', '#FDE68A', '#A7F3D0', '#99F6E4'];
  return `<div class="col-header-banner" style="border-color:${borderColors[idx % 4]};" aria-hidden="true">
                  ${diagrams[idx % 4]}
                </div>`;
}

function renderRulerVisualSvg(spec, ruler, isRuler2) {
  const track = String(spec.trackEyebrow || '');
  const segs = (ruler.segments && ruler.segments.length > 0)
    ? ruler.segments
    : [{ width: isRuler2 ? 65 : 35, cls: isRuler2 ? 'seg-primary' : 'seg-gross', label: '' }];
  const w0 = Math.max(10, Math.min(90, Math.round(Number(segs[0].width) || 50)));
  const primaryColor = SEG_DOT_COLORS[segs[0].cls] || (isRuler2 ? '#0041A5' : '#475569');
  const accentColor = (segs[1] && SEG_DOT_COLORS[segs[1].cls]) || (isRuler2 ? '#0F766E' : '#F59E0B');

  let svgBody = '';
  if (track.includes('Track 1')) {
    const pathObs = isRuler2 ? 'M16 36 L95 24 L185 13 L264 17' : 'M16 36 L264 11';
    const pathCf = isRuler2 ? 'M16 36 L95 24 L185 9 L264 5' : 'M16 36 L264 36';
    svgBody = `<line x1="16" y1="39" x2="264" y2="39" stroke="#CBD5E1" stroke-width="1"/>
              <path d="${pathCf}" stroke="#94A3B8" stroke-width="2" stroke-dasharray="4 3"/>
              <path d="${pathObs}" stroke="${primaryColor}" stroke-width="3" stroke-linecap="round"/>
              <circle cx="16" cy="36" r="3.5" fill="${primaryColor}"/>
              <circle cx="185" cy="${isRuler2 ? 13 : 19}" r="3.5" fill="${primaryColor}"/>
              <circle cx="264" cy="${isRuler2 ? 17 : 11}" r="4.5" fill="${accentColor}" stroke="#FFFFFF" stroke-width="1.5"/>`;
  } else if (track.includes('Track 3')) {
    const barPx = Math.round((w0 / 100) * 240);
    svgBody = `<rect x="16" y="15" width="248" height="14" rx="7" fill="#E2E8F0"/>
              <rect x="16" y="15" width="${barPx}" height="14" rx="7" fill="${primaryColor}"/>
              <line x1="172" y1="7" x2="172" y2="37" stroke="#BE123C" stroke-width="2" stroke-dasharray="3 2"/>
              <circle cx="${16 + barPx}" cy="22" r="5.5" fill="${accentColor}" stroke="#FFFFFF" stroke-width="2"/>`;
  } else {
    const rawTotal = segs.reduce((acc, s) => acc + Math.max(4, Number(s.width) || 0), 0) || 100;
    const totalPx = 248;
    let curX = 16;
    const rects = segs.map((s, i) => {
      const w = i === segs.length - 1
        ? Math.max(6, (16 + totalPx) - curX)
        : Math.max(8, Math.round((Math.max(4, Number(s.width) || 0) / rawTotal) * totalPx));
      const fill = SEG_DOT_COLORS[s.cls] || (isRuler2 ? '#0041A5' : '#475569');
      const el = `<rect x="${curX}" y="11" width="${Math.max(4, w - (i < segs.length - 1 ? 2 : 0))}" height="18" fill="${fill}"/>`;
      curX += w;
      return el;
    }).join('\n              ');
    svgBody = `<rect x="16" y="11" width="248" height="18" rx="4" fill="#E2E8F0"/>
              ${rects}
              <line x1="16" y1="35" x2="264" y2="35" stroke="#CBD5E1" stroke-width="1"/>
              <line x1="16" y1="32" x2="16" y2="38" stroke="#64748B" stroke-width="1.5"/>
              <line x1="78" y1="33" x2="78" y2="37" stroke="#94A3B8" stroke-width="1"/>
              <line x1="140" y1="32" x2="140" y2="38" stroke="#64748B" stroke-width="1.5"/>
              <line x1="202" y1="33" x2="202" y2="37" stroke="#94A3B8" stroke-width="1"/>
              <line x1="264" y1="32" x2="264" y2="38" stroke="#64748B" stroke-width="1.5"/>`;
  }

  const rawSum = segs.reduce((acc, s) => acc + Math.max(1, Number(s.width) || 0), 0) || 100;
  let runningPct = 0;
  const htmlSegs = segs.map((s, i) => {
    const pct = i === segs.length - 1
      ? Math.max(1, 100 - runningPct)
      : Math.max(1, Math.round((Math.max(1, Number(s.width) || 0) / rawSum) * 100));
    runningPct += pct;
    return `<div class="budget-bar-seg ${s.cls || 'seg-primary'}" style="width: ${pct}%;" data-pct="${pct}%"></div>`;
  }).join('');

  return `<div class="ruler-svg-frame" role="img" aria-label="${ruler.ariaLabel}">
            <svg width="100%" height="44" viewBox="0 0 280 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="280" height="44" fill="#F8FAFC"/>
              ${svgBody}
            </svg>
            <div class="budget-bar-track" aria-hidden="true">${htmlSegs}</div>
          </div>`;
}

const TETS_COMPANION_FIELDS = ['visibleLabel', 'title', 'url', 'claimCovered'];
const TETS_COMPANION_BANNED = [
  [/—|&mdash;/, 'em-dash'],
  [/\b(you|your|yours|yourself)\b/i, 'second-person pronoun (Rule 3c)'],
  [/\bground(ing|ed|s)?\b/i, 'g-word (Rule 3e)'],
  [/\b(naive|wrong|mistakes?|flaw|flawed|traps?|illusion|mislead|misleads|misleading|distort|distorts|distortion)\b/i, 'adversarial word (Rule 3a)'],
  [/\b(break|breaks|breaking|broken|breakdown|bottlenecks?|survive|survives|surviving|survival|crisis|crises|fail|fails|failing|failure|phantom|paralyzed|destroy|destroys|punish|punishes|penalize|penalizes)\b|(blind spots?|red flags?|false alarms?|fire alarms?)/i, 'metaphor/alarmist word (Rule 3b)'],
  [/\b(proves?|confirms?|validates?|demonstrates?|establishes?|ensures?|guarantees?|bulletproof|undeniable|unlock|upgrade)\b/i, 'overclaiming word (Rule 3d)'],
  [/\b(hides?|drives?)\b/i, 'anthropomorphic verb (Rule 20a)'],
  [/`/, 'raw backtick (Rule 19d)']
];
// Visible Table 1 strip is outside <details>, so its label also gets the full Rule 20a verb list.
const TETS_VISIBLE_ANTHRO = /\b(hides?|masks?|conceals?|buries|bury|disguises?|obscures?|blinds?|erases?|ignores?|overlooks?|overlooking|miss(?:es|ing)?|punishes?|penalizes?|starves?|locks out|skews?|chasing)\b/i;

function escapeHtmlText(str) {
  return String(str).replace(/&(?![a-z]+;|#\d+;)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Source gate against the local TooEarlyToSay build. Every companion must resolve to a published
// article whose H1 equals `title`; every number in `claimCovered` must sit in one passage of that
// article; and when the article's evidence-status note flags review, reconciliation, or
// article-only results, `claimCovered` must say so. A missing target fails the build unless the
// item sets `awaitingPublication: true`, in which case it is omitted from the page (never a broken
// link) until the article exists. TETS_SKIP_SOURCE_CHECK=1 is the only way to build without the repo.
const TETS_REPO = process.env.TETS_REPO || path.join(process.env.HOME || '', 'code', 'tooearlytosay-work');
const TETS_PASSAGE_CHARS = 700;
const TETS_STATUS_FLAG = /under reconciliation|under review|not publicly reproduced|article only|article-reported|preliminary working[- ]paper/i;
const TETS_CLAIM_STATUS = /under reconciliation|under review|not publicly reproduced|article-reported|not public\b|preliminary working[- ]paper|working[- ]paper/i;

function normalizeArticleText(str) {
  return String(str)
    .replace(/&quot;|&ldquo;|&rdquo;|[\u201C\u201D]/g, '"')
    .replace(/&#39;|&#x27;|&rsquo;|&lsquo;|[\u2018\u2019]/g, "'")
    .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&minus;|\u2212/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function numbersShareOnePassage(text, numbers) {
  if (numbers.length === 0) return true;
  const anchorNum = numbers[0];
  for (let i = text.indexOf(anchorNum); i !== -1; i = text.indexOf(anchorNum, i + 1)) {
    const win = text.slice(Math.max(0, i - TETS_PASSAGE_CHARS), i + TETS_PASSAGE_CHARS);
    if (numbers.every(n => win.includes(n))) return true;
  }
  return false;
}

// Returns true when the companion may render, false when it is awaiting publication.
function checkTetsCompanionSource(where, item) {
  if (process.env.TETS_SKIP_SOURCE_CHECK === '1') return true;
  if (!fs.existsSync(TETS_REPO)) {
    throw new Error(`${where}: TooEarlyToSay repo not found at ${TETS_REPO}; set TETS_REPO, or TETS_SKIP_SOURCE_CHECK=1 for a non-release build`);
  }
  const pathname = new URL(item.url).pathname.replace(/\/?$/, '/');
  const articlePath = path.join(TETS_REPO, 'public', pathname, 'index.html');
  if (!fs.existsSync(articlePath)) {
    if (item.awaitingPublication === true) {
      console.warn(`WARN ${where}: omitted until TETS article is published (${articlePath})`);
      return false;
    }
    throw new Error(`${where}: TETS target is not published (${articlePath})`);
  }
  const html = fs.readFileSync(articlePath, 'utf8');
  const fragment = new URL(item.url).hash.slice(1);
  if (fragment && !new RegExp(`id="${fragment}"`).test(html)) {
    throw new Error(`${where}: TETS article has no id="${fragment}" anchor`);
  }
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? normalizeArticleText(h1Match[1].replace(/<[^>]+>/g, '')) : '';
  if (h1 !== normalizeArticleText(item.title)) {
    throw new Error(`${where}.title does not match live article H1 "${h1}": ${item.title}`);
  }
  const bodyMatch = html.match(/<article[\s\S]*?<\/article>/i);
  const bodyText = normalizeArticleText((bodyMatch ? bodyMatch[0] : html).replace(/<[^>]+>/g, ' '));
  const numbers = (item.claimCovered.match(/\d[\d,]*(?:\.\d+)?/g) || []).map(n => n.replace(/,$/, ''));
  const unsupported = numbers.filter(n => !bodyText.includes(n));
  if (unsupported.length) {
    throw new Error(`${where}.claimCovered cites numbers absent from ${pathname}: ${unsupported.join(', ')}`);
  }
  if (!numbersShareOnePassage(bodyText, numbers)) {
    throw new Error(`${where}.claimCovered numbers (${numbers.join(', ')}) do not co-occur within one ${TETS_PASSAGE_CHARS * 2}-char passage of ${pathname}`);
  }
  const statusMatch = bodyText.match(/Evidence status:?\s([\s\S]{0,1200})/i);
  if (statusMatch && TETS_STATUS_FLAG.test(statusMatch[1]) && !TETS_CLAIM_STATUS.test(item.claimCovered)) {
    throw new Error(`${where}.claimCovered omits the article's evidence status ("${statusMatch[1].slice(0, 90)}...")`);
  }
  return true;
}

function normalizeTetsCompanions(spec) {
  const tetsCompanions = Array.isArray(spec.tetsCompanion)
    ? spec.tetsCompanion
    : (spec.tetsCompanion ? [spec.tetsCompanion] : []);
  const renderable = [];
  tetsCompanions.forEach((item, idx) => {
    const where = `[${spec.slug}] tetsCompanion[${idx}]`;
    for (const field of TETS_COMPANION_FIELDS) {
      if (!item || typeof item[field] !== 'string' || !item[field].trim()) {
        throw new Error(`${where} is missing non-empty "${field}"`);
      }
    }
    if (!/^https:\/\//.test(item.url)) {
      throw new Error(`${where} url must be an absolute https URL: ${item.url}`);
    }
    for (const field of ['visibleLabel', 'title', 'claimCovered']) {
      for (const [re, why] of TETS_COMPANION_BANNED) {
        const m = item[field].match(re);
        if (m) throw new Error(`${where}.${field} contains banned ${why} "${m[0]}": ${item[field]}`);
      }
    }
    const vm = item.visibleLabel.match(TETS_VISIBLE_ANTHRO);
    if (vm) throw new Error(`${where}.visibleLabel contains Rule 20a verb "${vm[0]}": ${item.visibleLabel}`);
    if (checkTetsCompanionSource(where, item)) renderable.push(item);
  });
  return renderable;
}

function renderModuleHtml(spec) {
  const canonicalUrl = `https://www.caphegroup.org/methods-lab/${spec.slug}`;
  const tetsCompanions = normalizeTetsCompanions(spec);
  if (spec.pageTitle.length > 60) {
    throw new Error(`[${spec.slug}] pageTitle exceeds 60 chars (${spec.pageTitle.length}): ${spec.pageTitle}`);
  }
  if (spec.metaDescription.length < 50 || spec.metaDescription.length > 160) {
    throw new Error(`[${spec.slug}] metaDescription must be 50-160 chars (${spec.metaDescription.length}): ${spec.metaDescription}`);
  }

  // Build Enumerated Endnotes & Sources list ([1]..[N])
  const endnoteEntries = [];
  const hrefMap = new Map();
  const registerEndnote = (href, labelHtml) => {
    const cleanHref = String(href || '').trim();
    if (!cleanHref || cleanHref.startsWith('#')) return null;
    if (hrefMap.has(cleanHref)) return hrefMap.get(cleanHref);
    const num = endnoteEntries.length + 1;
    hrefMap.set(cleanHref, num);
    const cleanLabel = String(labelHtml || '').replace(/<[^>]+>/g, '').trim() || cleanHref;
    const isExt = /^https?:\/\//i.test(cleanHref) && !cleanHref.includes('caphegroup.org');
    const extAttrs = isExt ? ' target="_blank" rel="noopener noreferrer"' : '';
    endnoteEntries.push(`<a href="${cleanHref}"${extAttrs} class="text-[#0041A5] underline font-semibold">${cleanLabel}</a>`);
    return num;
  };

  if (Array.isArray(spec.endnotes)) {
    for (const item of spec.endnotes) {
      const num = endnoteEntries.length + 1;
      endnoteEntries.push(item);
      const hm = String(item).match(/href="([^"]+)"/i);
      if (hm && !hrefMap.has(hm[1])) hrefMap.set(hm[1], num);
    }
  }

  const formatAnswerWithEndnotes = (htmlStr) => {
    let out = String(htmlStr || '').replace(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (m, href, inner) => {
      if (href.startsWith('#endnote-')) return m;
      const n = registerEndnote(href, inner);
      const cleanInner = inner.replace(/<[^>]+>/g, '').trim();
      return n
        ? `${cleanInner}<sup class="text-xs font-semibold text-[#0041A5] ml-0.5"><a href="#endnote-${n}" onclick="document.getElementById('data-sources-endnotes').open=true" class="no-underline hover:underline">[${n}]</a></sup>`
        : cleanInner;
    });
    out = simplifyToGrade7(out);
    out = out.replace(/\s*(?<!>)\[(\d+(?:[,-]\d+)*)\](?!<\/a>)([.,;:]?)/g, (m, nums, punct) => {
      const links = nums.split(/[,-]/).map(n => {
        const cleanN = n.trim();
        return `<a href="#endnote-${cleanN}" onclick="document.getElementById('data-sources-endnotes').open=true" class="no-underline hover:underline">[${cleanN}]</a>`;
      }).join('');
      return `${punct || ''}<sup class="text-xs font-semibold text-[#0041A5] ml-0.5">${links}</sup>`;
    });
    // Keep parentheses and trailing punctuation inside inline tags so tag-stripping word counters do not count '(' or '.' as standalone words
    out = out
      .replace(/\(<(strong|em|b|i)>/gi, '<$1>(')
      .replace(/<\/(strong|em|b|i)>([).,;:%]+)/gi, '$2</$1>')
      .replace(/<\/sup>([.,;:])/gi, '$1</sup>');
    return out;
  };

  const renderedAnswerHtml = formatAnswerWithEndnotes(spec.answerHtml);
  // Register any remaining external links from methodologyParagraphs and block2 so all sources appear in Enumerated Endnotes
  const scanSources = [
    ...(spec.methodologyParagraphs || []),
    spec.block2 && spec.block2.ruler1 ? spec.block2.ruler1.desc : '',
    spec.block2 && spec.block2.ruler2 ? spec.block2.ruler2.desc : ''
  ];
  for (const srcHtml of scanSources) {
    const linkRe = /<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
    let lm;
    while ((lm = linkRe.exec(String(srcHtml || ''))) !== null) {
      registerEndnote(lm[1], lm[2]);
    }
  }

  const answerWords = countWords(renderedAnswerHtml);
  if (answerWords < 40 || answerWords > 130) {
    throw new Error(`[${spec.slug}] answerHtml word count (${answerWords}) out of 40-130 target window`);
  }

  const articleLd = {
    "@context": "https://schema.org",
    "@type": ["Article", "LearningResource"],
    "headline": spec.h1,
    "description": spec.metaDescription,
    "author": {
      "@type": "Organization",
      "name": "CAPHE",
      "url": "https://www.caphegroup.org"
    },
    "publisher": {
      "@type": "Organization",
      "name": "California Association of Public Health Economists",
      "url": "https://www.caphegroup.org",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.caphegroup.org/assets/images/logo.png"
      }
    },
    "mainEntityOfPage": canonicalUrl,
    "educationalLevel": "Professional",
    "isPartOf": {
      "@type": "CollectionPage",
      "name": "California Public Health Case Studies",
      "url": "https://www.caphegroup.org/methods-lab"
    }
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": spec.faqs.map(q => ({
      "@type": "Question",
      "name": simplifyToGrade7(q.question),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": simplifyToGrade7(q.answer)
      }
    }))
  };

  const renderBarLegend = (segments) => segments.map(seg => {
    const dotColor = SEG_DOT_COLORS[seg.cls] || '#0041A5';
    const labelText = String(seg.label || '').trim();
    return `<span class="bar-legend-pill"><span class="bar-legend-dot" style="background: ${dotColor};" aria-hidden="true"></span><span>${labelText}</span></span>`;
  }).join('\n            ');

  const colScopeNotes = [];
  const renderTable1Headers = (cols) => cols.map((col) => {
    let tagText = stripVisibleModeTag(simplifyToGrade7(String(col.tag || '').trim()))
      .replace(/\bTWFE\b/g, 'County & Year FE')
      .replace(/\bOLS\b/g, 'Simple Avg')
      .replace(/\bFFS\b/g, 'Per-Visit')
      .replace(/\s*\([^()]*$/g, '')
      .replace(/:\s*N\s*=\s*[\d,]+/gi, '')
      .replace(/\bN\s*=\s*([\d,]+)\s+Draws\b/gi, '$1-Draw Check')
      .replace(/\s*\(\s*N\s*=\s*[\d,]+\s*\)/gi, '')
      .trim();
    let titleText = stripVisibleModeTag(simplifyToGrade7(String(col.title || '').trim()))
      .replace(/\bTWFE\b/g, 'County & Year FE')
      .replace(/\bOLS\b/g, 'Simple Avg')
      .replace(/\bFFS\b/g, 'Per-Visit')
      .replace(/\s*\(\s*N\s*=\s*[\d,]+\s*\)/gi, '')
      .trim();
    const subText = simplifyToGrade7(String(col.subtitle || '').trim());
    if (subText) {
      colScopeNotes.push(`<strong>${titleText}.</strong> ${subText}`);
    }
    return `              <th scope="col" class="py-3.5 px-4 text-xs font-bold text-slate-900 col-data align-top border-l border-slate-200">
                <div class="text-xs font-bold text-[#0041A5] mb-0.5">${tagText}</div>
                <div class="text-sm sm:text-base font-bold text-slate-950 leading-snug">${titleText}</div>
              </th>`;
  }).join('\n');

  const table1HeadersHtml = renderTable1Headers(spec.table1.columns);

  const separateTableSubtitle = (rawSub, fallbackTitle) => {
    const cleaned = stripVisibleModeTag(simplifyToGrade7(String(rawSub || '').trim()));
    const hasTech = /(\bN\s*=\s*\d|\bB\d{5}\b|regression parameters|area-median|SPA\s+\d)/i;
    const words = cleaned.split(/\s+/).filter(Boolean);
    if (!hasTech.test(cleaned) && words.length <= 22) {
      return { visibleSub: cleaned, noteSub: '' };
    }
    let short = cleaned
      .replace(/\s*\([^()]*\)/g, '')
      .replace(/\bN\s*=\s*[\d,]+-?\s*/gi, '')
      .replace(/\s+alongside\s+.*$/i, '')
      .replace(/\s+calibrated\s+on\s+.*$/i, '')
      .replace(/\s+from\s+the\s+official\s+.*$/i, '')
      .replace(/\s+across\s+\d[\d,]*\s+.*$/i, '')
      .split(/(?<=[a-z0-9%])\.\s+|\s*;\s*|\s+-\s+/i)[0]
      .trim()
      .replace(/[,;:]$/, '');
    if (hasTech.test(short) || short.split(/\s+/).filter(Boolean).length > 20 || short.split(/\s+/).filter(Boolean).length < 5) {
      short = `Key data and policy results across the four ${fallbackTitle} columns.`;
    } else if (!/[.?!]$/.test(short)) {
      short += '.';
    }
    return { visibleSub: short, noteSub: cleaned };
  };

  const t1SubSplit = separateTableSubtitle(spec.table1.subtitle, 'comparison');
  const t2SubSplit = separateTableSubtitle(spec.table2.subtitle, 'decision');

  let hasModeledRows = false;
  const overflowNotes = [];
  const renderTable1Rows = (rows) => rows.map(row => {
    const { html: rowLabelHtml, cleanText: rowCleanText, isModeled } = formatTable1RowLabel(row.label, row.modeled, row.cells);
    if (isModeled) hasModeledRows = true;
    if (row.highlight) {
      const cells = row.cells.map((cell, cIdx) => {
        const colTitle = (spec.table1.columns[cIdx] && spec.table1.columns[cIdx].title) || `Col ${cIdx + 1}`;
        const rawBar = cell.barColor || '#0D9488';
        const barColor = (rawBar === '#BE123C' || rawBar === '#DC2626' || rawBar === '#E11D48' || rawBar === '#F43F5E') ? '#0041A5' : rawBar;
        const rawColor = cell.textColor || 'text-emerald-900';
        const textColor = rawColor.includes('rose') ? 'text-[#003080]' : rawColor;
        const barHtml = typeof cell.barWidth === 'number'
          ? `\n                <div class="inline-mini-bar" aria-hidden="true"><div style="width: ${cell.barWidth}%; background: ${barColor};"></div></div>`
          : '';
        return `              <td class="py-4 px-4 align-top ${textColor} border-l border-emerald-200">
                ${formatTable1Cell(cell.val, true, true, overflowNotes, rowCleanText, simplifyToGrade7(colTitle))}${barHtml}
              </td>`;
      }).join('\n');
      return `            <tr class="bg-emerald-50/70 border-y-2 border-emerald-200">
              <th scope="row" class="py-4 px-5 font-bold text-emerald-950 bg-emerald-100/60 align-top leading-snug">
                ${rowLabelHtml}
              </th>
${cells}
            </tr>`;
    }
    const cells = row.cells.map((cell, cIdx) => {
      const colTitle = (spec.table1.columns[cIdx] && spec.table1.columns[cIdx].title) || `Col ${cIdx + 1}`;
      if (cell.badge) {
        return `              <td class="py-3.5 px-4 align-top border-l border-slate-200">
                ${simplifyToGrade7(cell.val)}
              </td>`;
      }
      return `              <td class="py-3.5 px-4 align-top border-l border-slate-200">
                ${formatTable1Cell(cell.val, false, cell.bold !== false, overflowNotes, rowCleanText, simplifyToGrade7(colTitle))}
              </td>`;
    }).join('\n');
    return `            <tr class="hover:bg-slate-50/50">
              <th scope="row" class="py-3.5 px-5 font-semibold text-slate-900 bg-slate-50/70 align-top leading-snug">
                ${rowLabelHtml}
              </th>
${cells}
            </tr>`;
  }).join('\n');

  const table1RowsHtml = renderTable1Rows(spec.table1.rows);
  const t1SubNoteHtml = t1SubSplit.noteSub
    ? `<p class="mt-1.5"><strong>Sample &amp; Benchmark Scope.</strong> ${t1SubSplit.noteSub}</p>`
    : '';
  const block2ArchiveNote = spec.block2
    ? `<p class="mt-1.5"><strong>Two-Ruler Benchmark Summary.</strong> ${simplifyToGrade7(spec.block2.contextTag || '')}. ${simplifyToGrade7(spec.block2.ruler1.title)}: <strong>${simplifyToGrade7(spec.block2.ruler1.stat)}</strong>. ${simplifyToGrade7(spec.block2.ruler1.desc)} ${simplifyToGrade7(spec.block2.ruler2.title)}: <strong>${simplifyToGrade7(spec.block2.ruler2.stat)}</strong>. ${simplifyToGrade7(spec.block2.ruler2.desc)}</p>`
    : '';
  const colScopeHtml = colScopeNotes.length > 0
    ? `<p class="mt-1.5"><strong>Column Scope.</strong> ${colScopeNotes.join('. ')}.</p>`
    : '';
  const overflowNotesHtml = overflowNotes.length > 0
    ? `<p class="mt-1.5"><strong>Cell Sub-Label Details.</strong> ${overflowNotes.join(' ')}</p>`
    : '';
  const estimatorCrosswalkHtml = /(OLS|TWFE|Lewbel|Instrumental Variables|F\s*=\s*314\.1)/i.test(JSON.stringify(spec.table1))
    ? `<p class="mt-1.5"><strong>Model Crosswalk.</strong> Plain table labels map to standard study models. <em>Raw Yearly Average / Simple Avg</em> is an unadjusted OLS model where routine and outbreak budgets mix. <em>County &amp; Year FE</em> is a Two-Way Fixed Effects (TWFE) panel model. <em>Routine-Budget Analysis / 21-Year County Budget Model</em> is a Two-Stage Least Squares (2SLS / Lewbel 2012) model that isolates routine base budget shifts. <em>County Board Budget Rules</em> uses Brown (2014) county board rules.</p>`
    : '';
  const table1FootnoteHtml = `
      <details class="group bg-slate-50 border-t border-slate-200 text-sm text-slate-700">
        <summary class="px-5 py-3 cursor-pointer list-none flex items-center justify-between hover:bg-slate-100 transition-colors select-none focus:outline-none focus:ring-2 focus:ring-[#0041A5] focus:ring-inset">
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-[#0041A5] transition-transform duration-200 group-open:rotate-90 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
            <span class="font-bold text-slate-900">Table 1 Notes &amp; * Modeled Estimates</span>
          </div>
          <span class="text-xs font-semibold text-[#0041A5] bg-white border border-slate-300 rounded px-2.5 py-1 whitespace-nowrap">Expand notes</span>
        </summary>
        <div class="px-5 pb-4 pt-3 border-t border-slate-200/60 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>${simplifyToGrade7(spec.table1.footnote || '<strong class="text-slate-800">Table 1 Notes &amp; * Modeled Estimates.</strong> Rows marked with <strong class="text-slate-800">*</strong> apply published fee rates or trial parameters to observed baseline data. Open the notes below for full formulas and data sources.')}</p>${t1SubNoteHtml}${colScopeHtml}${estimatorCrosswalkHtml}${overflowNotesHtml}${block2ArchiveNote}
        </div>
      </details>`;

  const tetsStripHtml = tetsCompanions.length > 0 ? `
      <div class="px-5 pb-4">
        <p class="mt-2.5 px-3.5 py-2 bg-[#F4F7FB] border-l-2 border-[#0041A5] rounded-r text-xs text-slate-700 leading-relaxed">
          <strong class="text-[#0041A5]">Method &amp; Data Audit (TooEarlyToSay.com):</strong>
          ${tetsCompanions.map(item => `<a href="${escapeHtmlText(item.url)}" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold ml-1">${escapeHtmlText(item.visibleLabel)} &rarr;</a>`).join(' &middot; ')}
        </p>
      </div>` : '';

  const tetsCalloutHtml = tetsCompanions.length > 0 ? `
          <div class="tets-companion-callout mt-5 pt-4 border-t border-slate-200">
            <h3 class="text-xs font-bold uppercase tracking-wider text-[#0041A5] mb-2">Companion Method &amp; Code Guides (TooEarlyToSay.com)</h3>
            <ul class="space-y-1.5 text-xs text-slate-700">
              ${tetsCompanions.map(item => `<li>
                <a href="${escapeHtmlText(item.url)}" target="_blank" rel="noopener noreferrer" class="font-semibold text-[#0041A5] underline">${escapeHtmlText(item.title)}</a>.
                <span>${escapeHtmlText(item.claimCovered)}</span>
              </li>`).join('\n              ')}
            </ul>
          </div>` : '';

  const renderTable2Headers = (cols) => cols.map((col) => {
    const cleanTitle = stripVisibleModeTag(simplifyToGrade7(col.title))
      .replace(/\s*\(\s*N\s*=\s*[\d,]+\s*\)/gi, '')
      .trim();
    return `              <th scope="col" class="py-3.5 px-4 text-sm font-bold text-slate-950 col-data align-top leading-snug border-l border-slate-200">
                ${cleanTitle}
              </th>`;
  }).join('\n');

  const t2OverflowNotes = [];
  const stripRepeatedTable2Stem = (txt, isPolicyFit = false, rowLabel = '', colTitle = '') => {
    const fullClean = stripVisibleModeTag(String(txt || ''))
      .replace(/^Best when\s+/i, '')
      .replace(/^Best for\s+/i, 'Fits ')
      .trim();
    const targetW = isPolicyFit ? 14 : 16;
    let s = fullClean.replace(/\s*\([^()]*\)/g, '').replace(/\s+/g, ' ').trim();
    if (/^[A-Z][A-Za-z0-9\s\/&;-]{2,42}:\s+/.test(s)) {
      s = s.replace(/^[A-Z][A-Za-z0-9\s\/&;-]{2,42}:\s+/, '');
    }
    const sentences = s.split(/(?<=[a-z0-9%])\.\s+(?=[a-zA-Z0-9])/);
    if (sentences.length > 1 && sentences[0].split(/\s+/).length >= 4) {
      s = sentences[0];
    }
    if (s.split(/\s+/).length > targetW) {
      s = s
        .replace(/,\s*with\s+[^,]{3,45},/gi, '')
        .replace(/\s+without an? (?:independent|split) historical check\b/gi, '')
        .replace(/\s+for the Jan 1,\s*2024 wage-cap repeal and the Jan 1,\s*2025 90% replacement tier/gi, 'for the 2024 and 2025 statutory changes')
        .replace(/\s+in the net social surplus\.?$/i, '')
        .replace(/\s+and a (?:comparison|check) series rising\s+\+[\d.]+%\.?$/i, '')
        .replace(/\s+away from languages with thousands of (?:paperwork|form) drops\.?$/i, '');
    }
    if (s.split(/\s+/).length > targetW) {
      const intro = s.match(/^(?:With|In|Across|Under|When|If|Without|Because|While|Although|Even though|Before|After|Among|For|At|By|Despite|From|Against|Once)\s+(?:[^,]|,\d{3}){3,95},\s+([a-zA-Z0-9$].*)$/i);
      if (intro && intro[1].split(/\s+/).length >= 4) {
        s = intro[1];
      }
    }
    if (s.split(/\s+/).length > targetW) {
      const trail = s.split(/\s*(?:;|:|—|\s-\s|,\s*(?:and|but|yet|whereas|while|leaving|where|which|because|so|although|though|even though|unless|if|when|since|after|before|paired with|instead of|rather than|yielding|generating|producing|creating|causing|forcing|allowing|requiring|making|meaning|showing|confirming|resulting in|compared with|compared to|relative to|despite|without|including|such as|consistent with|with the|lowering|cutting|adding|focusing|finally|falsely classifying|or\s+[a-z])|\s+(?:unless|because|(?<!\bas\s)if|while|whereas|instead of|rather than|compared with|compared to|against\s+\+|despite\s+\d|to satisfy|based on a|and\s+(?:cuts?|reduces?|highlights?|diverts?|we\s+use)|or\s+holds\b|during\s+the\s+exact\s+year|ahead\s+of\b|in\s+the\s+Bay\s+Area))\s*/i);
      if (trail[0] && trail[0].split(/\s+/).length >= 4 && !/\b(as|on|in|to|for|with|from|of|by|at|into|under)\b$/i.test(trail[0].trim())) {
        s = trail[0];
      }
    }
    s = s.trim().replace(/[,;:]$/, '');
    if (s && !/[.?!"]$/.test(s)) s += '.';
    s = s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
    if (s && fullClean.split(/\s+/).length > s.split(/\s+/).length + 2 && rowLabel && colTitle) {
      t2OverflowNotes.push(`<strong>${rowLabel} (${colTitle}).</strong> ${fullClean}`);
    }
    return s;
  };

  const renderTable2Rows = (rows) => rows.map(row => {
    const rowTh = stripVisibleModeTag(simplifyToGrade7(String(row.label || '').trim()))
      .replace(/\s*\([^()]+\)\s*$/g, '');
    if (row.policyFit) {
      const cells = row.cells.map((cell, cIdx) => {
        const colTitle = (spec.table1.columns[cIdx] && spec.table1.columns[cIdx].title) || `Col ${cIdx + 1}`;
        const headText = stripVisibleModeTag(simplifyToGrade7(String(cell.headline || '').trim()));
        const detailText = stripRepeatedTable2Stem(simplifyToGrade7(String(cell.detail || '').trim()), true, rowTh, simplifyToGrade7(colTitle));
        return `              <td class="py-4 px-4 text-xs sm:text-[13.5px] leading-relaxed align-top border-l border-slate-200">
                <strong class="block text-sm font-bold text-[#003080] mb-0.5 leading-snug">${headText}<span class="sr-only">.</span></strong>
                <span class="block text-slate-800 leading-snug">${detailText}</span>
              </td>`;
      }).join('\n');
      return `            <tr class="bg-slate-50 border-t-2 border-slate-200">
              <th scope="row" class="py-4 px-5 font-bold text-slate-950 bg-slate-100 align-top leading-snug">
                ${rowTh}
              </th>
${cells}
            </tr>`;
    }
    const cells = row.cells.map((cell, cIdx) => {
      const colTitle = (spec.table1.columns[cIdx] && spec.table1.columns[cIdx].title) || `Col ${cIdx + 1}`;
      const cellVal = stripRepeatedTable2Stem(simplifyToGrade7(String(cell.val || '').trim()), false, rowTh, simplifyToGrade7(colTitle));
      const cls = row.mono
        ? `py-3.5 px-4 font-mono font-bold align-top ${cell.color || 'text-slate-950'} border-l border-slate-200`
        : `py-3.5 px-4 text-xs sm:text-[13.5px] text-slate-900 leading-snug align-top border-l border-slate-200`;
      return `              <td class="${cls}">
                ${cellVal}
              </td>`;
    }).join('\n');
    return `            <tr class="hover:bg-slate-50/50">
              <th scope="row" class="py-3.5 px-5 font-semibold text-slate-900 bg-slate-50/70 align-top leading-snug">
                ${rowTh}
              </th>
${cells}
            </tr>`;
  }).join('\n');
  const table2RowsHtml = renderTable2Rows(spec.table2.rows);
  const t2NotesCombined = [
    ...(t2SubSplit.noteSub ? [`<strong>Scope &amp; Benchmark Details.</strong> ${t2SubSplit.noteSub}`] : []),
    ...(spec.table2.notesBullets || []).map(b => simplifyToGrade7(b)),
    ...(t2OverflowNotes.length > 0 ? [`<strong>Extended Cell Context.</strong> ${t2OverflowNotes.join(' &middot; ')}`] : [])
  ];

  let countyLookupHtml = '';
  if (spec.countyLookup && spec.countyLookup.dataPath) {
    const countyJsonPath = path.join(__dirname, '..', spec.countyLookup.dataPath);
    const countyPayload = JSON.parse(fs.readFileSync(countyJsonPath, 'utf8'));
    const countyKeys = Object.keys(countyPayload.counties);
    const orderedKeys = ['STATEWIDE', ...countyKeys.filter(k => k !== 'STATEWIDE').sort()];
    const optionsHtml = orderedKeys.map(k => {
      const c = countyPayload.counties[k];
      return `<option value="${k}">${c.name}</option>`;
    }).join('');
    const sectionTitle = spec.countyLookup.badge || '58-County Lookup &amp; Impact Check';
    const sectionSubtitle = spec.countyLookup.subtitle || 'Pick a county, a program model, and a health impact level below.';
    countyLookupHtml = `
    <!-- INTERACTIVE 58-COUNTY CHW BENCHMARK & SENSITIVITY CALCULATOR -->
    <div class="mb-3">
      <h2 class="text-xl sm:text-2xl font-bold text-slate-950">${sectionTitle}</h2>
      <p class="text-sm text-slate-600 mt-1 max-w-4xl">
        ${sectionSubtitle}
      </p>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 mb-8 shadow-sm" role="region" aria-label="${sectionTitle}">
      <!-- UNIFIED 3-DROPDOWN CONTROL BAR -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 border border-slate-200 rounded-lg p-3.5 mb-4">
        <div>
          <label for="chwCountySelect" class="block text-xs font-bold text-slate-800 mb-1">1. County</label>
          <select id="chwCountySelect" class="w-full px-3 py-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0041A5]">
            ${optionsHtml}
          </select>
        </div>
        <div>
          <label for="chwScenarioSelect" class="block text-xs font-bold text-slate-800 mb-1">2. Program Model</label>
          <select id="chwScenarioSelect" class="w-full px-3 py-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0041A5]">
            <option value="1">Scenario 1: Hospital Care (Medi-Cal View)</option>
            <option value="2">Scenario 2: Hospital Care (Hospital View)</option>
            <option value="3">Scenario 3: Clinic Chronic Care (75 Patients)</option>
            <option value="4">Scenario 4: Neighborhood Outreach (150 Adults)</option>
          </select>
        </div>
        <div>
          <label for="chwSensSelect" class="block text-xs font-bold text-slate-800 mb-1">3. Health Impact Level</label>
          <select id="chwSensSelect" class="w-full px-3 py-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0041A5]">
            <option value="1.0" selected>100% Trial Result (Expected)</option>
            <option value="0.5">50% Half Impact (Conservative)</option>
            <option value="1.25">125% Higher Impact (Focused)</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div class="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
          <span class="block text-xs font-bold text-slate-700">Annual Worker Cost</span>
          <span id="chwWageStat" class="block font-mono text-base sm:text-lg font-bold text-slate-950 mt-0.5">$103,719 / yr</span>
          <span id="chwWageSub" class="block text-xs text-slate-600 mt-1 leading-snug">$54,000 base &middot; 6.5% to 9.8% from visits</span>
        </div>
        <div class="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
          <span class="block text-xs font-bold text-slate-700">Year-1 Hospital Savings*</span>
          <span id="chwOffsetStat" class="block font-mono text-base sm:text-lg font-bold text-[#003080] mt-0.5">$107,006 / yr</span>
          <span id="chwOffsetSub" class="block text-xs text-slate-600 mt-1 leading-snug">27.0 ER visits, 11.6 stays avoided</span>
        </div>
        <div class="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
          <span class="block text-xs font-bold text-slate-700">Added Healthy Years*</span>
          <span id="chwQalyStat" class="block font-mono text-base sm:text-lg font-bold text-emerald-800 mt-0.5">+3.00 QALYs</span>
          <span id="chwQalySub" class="block text-xs text-slate-600 mt-1 leading-snug">$300,000 health value</span>
        </div>
        <div class="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5">
          <span class="block text-xs font-bold text-emerald-950">Total Annual Value*</span>
          <span id="chwTotalStat" class="block font-mono text-base sm:text-lg font-bold text-emerald-900 mt-0.5">$407,006 / yr (3.92:1)</span>
          <span id="chwTotalSub" class="block text-xs text-slate-800 mt-1 leading-snug">+$3,287 Year-1 cash + $300,000 health</span>
        </div>
      </div>
      <script>
        (function() {
          const counties = ${JSON.stringify(countyPayload.counties)};
          const sel = document.getElementById('chwCountySelect');
          const scenSel = document.getElementById('chwScenarioSelect');
          const sensSel = document.getElementById('chwSensSelect');
          const wageStat = document.getElementById('chwWageStat');
          const wageSub = document.getElementById('chwWageSub');
          const offsetStat = document.getElementById('chwOffsetStat');
          const offsetSub = document.getElementById('chwOffsetSub');
          const qalyStat = document.getElementById('chwQalyStat');
          const qalySub = document.getElementById('chwQalySub');
          const totalStat = document.getElementById('chwTotalStat');
          const totalSub = document.getElementById('chwTotalSub');
          const fmt = (n) => '$' + Math.round(Math.abs(n)).toLocaleString('en-US');
          const fmtSigned = (n) => (n >= 0 ? '+' : '-') + fmt(n);
          function update() {
            const c = counties[sel.value] || counties.STATEWIDE;
            const curScen = Number(scenSel.value) || 1;
            const curMult = Number(sensSel.value) || 1.0;
            let loaded = c.chw_loaded_cost;
            let gross = 0;
            let qalys = 0;
            let eventsText = '';
            let visitPct = c.ffs_share_low_pct + '% to ' + c.ffs_share_high_pct + '% from visits';
            if (curScen === 1) {
              loaded = c.chw_loaded_cost;
              gross = Math.round(107006 * curMult);
              qalys = 3.00 * curMult;
              eventsText = (27.0 * curMult).toFixed(1) + ' ER visits, ' + (11.55 * curMult).toFixed(1) + ' stays avoided';
            } else if (curScen === 2) {
              loaded = c.chw_loaded_cost;
              gross = Math.round(291171 * curMult);
              qalys = 3.00 * curMult;
              eventsText = (27.0 * curMult).toFixed(1) + ' ER visits, ' + (11.55 * curMult).toFixed(1) + ' stays avoided';
            } else if (curScen === 3) {
              loaded = c.chw_ongoing_cost;
              gross = Math.round(182333 * curMult);
              qalys = 4.09 * curMult;
              eventsText = (23.1 * curMult).toFixed(1) + ' ER visits, ' + (7.88 * curMult).toFixed(1) + ' stays avoided';
              visitPct = ((46561 / loaded) * 100).toFixed(1) + '% from clinic visits';
            } else {
              loaded = c.chw_promotora_cost;
              gross = Math.round(c.scen4_gross_societal_offset * curMult);
              qalys = 8.18 * curMult;
              eventsText = (c.scen4_avoided_ed * curMult).toFixed(1) + ' ER visits, ' + (c.scen4_avoided_ip * curMult).toFixed(1) + ' stays avoided';
            }
            const net = gross - loaded;
            const qalyVal = Math.round(qalys * 100000);
            const totalVal = gross + qalyVal;
            const totalRatio = (totalVal / loaded).toFixed(2) + ':1';
            wageStat.textContent = fmt(loaded) + ' / yr';
            wageSub.textContent = fmt(c.chw_base_salary) + ' base · ' + visitPct;
            offsetStat.textContent = fmt(gross) + ' / yr';
            offsetSub.textContent = eventsText;
            qalyStat.textContent = '+' + qalys.toFixed(2) + ' QALYs';
            qalySub.textContent = fmt(qalyVal) + ' health value' + (curScen === 4 ? ' + 38 screenings' : '');
            totalStat.textContent = fmt(totalVal) + ' / yr (' + totalRatio + ')';
            if (curScen === 4) {
              const netOutlay = Math.max(0, loaded - gross);
              const icer = netOutlay > 0 ? fmt(Math.round(netOutlay / qalys)) + ' / QALY' : 'Pays for itself';
              const perRes = Math.round(Math.abs(net) / 150);
              totalSub.textContent = icer + ' · $' + perRes + ' net cost / adult';
            } else {
              totalSub.textContent = fmtSigned(net) + ' Year-1 cash + ' + fmt(qalyVal) + ' health';
            }
          }
          sel.addEventListener('change', update);
          scenSel.addEventListener('change', update);
          sensSel.addEventListener('change', update);
        })();
      </script>
    </div>`;
  }

  const interactiveHtml = countyLookupHtml || (spec.interactive ? (() => {
    const cleanOptions = spec.interactive.options.map(opt => ({
      label: stripVisibleModeTag(simplifyToGrade7(opt.label)),
      headline: stripVisibleModeTag(simplifyToGrade7(opt.headline)),
      metric: stripVisibleModeTag(simplifyToGrade7(opt.metric)),
      desc: stripVisibleModeTag(simplifyToGrade7(opt.desc))
    }));
    const secTitle = stripVisibleModeTag(simplifyToGrade7(spec.interactive.title));
    const secSub = stripVisibleModeTag(simplifyToGrade7(spec.interactive.subtitle || 'Comparing scenarios side by side on the primary baseline scale.'));
    const notesTitle = stripVisibleModeTag(simplifyToGrade7(spec.interactive.notesTitle || 'Scenario Calculations, Scale Crosswalk &amp; Parameter Notes'));
    const notesBullets = (spec.interactive.notesBullets || []).map(b => `<p>&bull; ${simplifyToGrade7(b)}</p>`).join('\n          ');
    const cardsHtml = cleanOptions.map((opt, i) => {
      const isHighlight = i === cleanOptions.length - 1;
      const cardCls = isHighlight
        ? 'scenario-card bg-emerald-50/70 border border-emerald-200 rounded-lg p-4'
        : 'scenario-card bg-slate-50 border border-slate-200 rounded-lg p-4';
      const labelCls = isHighlight ? 'text-xs font-bold text-emerald-950 mb-1' : 'text-xs font-bold text-[#0041A5] mb-1';
      return `        <div class="${cardCls}">
          <div class="${labelCls}">${opt.label}</div>
          <div class="text-sm font-bold text-slate-950 leading-snug mb-1.5">${opt.headline}</div>
          <div class="font-mono text-base sm:text-lg font-bold text-emerald-900 mb-1.5">${opt.metric}</div>
          <p class="scenario-desc text-xs sm:text-sm text-slate-700 leading-snug">${opt.desc}</p>
        </div>`;
    }).join('\n');
    const detailsHtml = notesBullets ? `
      <details class="group bg-slate-50 border-t border-slate-200 text-sm text-slate-700">
        <summary class="px-5 py-3.5 cursor-pointer list-none flex items-center justify-between hover:bg-slate-100 transition-colors select-none focus:outline-none focus:ring-2 focus:ring-[#0041A5] focus:ring-inset">
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-[#0041A5] transition-transform duration-200 group-open:rotate-90 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
            <span class="font-bold text-slate-900">${notesTitle}</span>
          </div>
          <span class="text-xs font-semibold text-[#0041A5] bg-white border border-slate-300 rounded px-2.5 py-1 whitespace-nowrap">Expand scenario notes</span>
        </summary>
        <div class="px-5 pb-4 pt-3 border-t border-slate-200/60 leading-relaxed space-y-2">
          ${notesBullets}
        </div>
      </details>` : '';
    return `
    <!-- SIDE-BY-SIDE SCENARIO COMPARISON GRID -->
    <div class="mb-3">
      <h2 class="text-xl sm:text-2xl font-bold text-slate-950">${secTitle}</h2>
      <p class="text-sm text-slate-600 mt-1 max-w-4xl">
        ${secSub}
      </p>
    </div>
    <div class="scenario-grid bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8" role="region" aria-label="${secTitle}">
      <div class="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-3">
${cardsHtml}
      </div>${detailsHtml}
    </div>`;
  })() : '');

  const relatedLinksHtml = spec.related.map(r =>
    `          <li class="my-2"><a href="/methods-lab/${r.slug}" class="text-[#0041A5] hover:text-[#003080] font-semibold underline">${r.title}</a></li>`
  ).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${spec.pageTitle}</title>
  <meta name="description" content="${spec.metaDescription}">${spec.unlisted ? '\n  <meta name="robots" content="noindex, nofollow">' : ''}
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="${spec.pageTitle}">
  <meta property="og:description" content="${spec.metaDescription}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-primary: #0041A5;
      --color-primary-light: #1565C0;
      --color-primary-dark: #003080;
      --color-secondary: #0D9488;
      --color-accent: #F9A825;
      --color-text: #1C1C1C;
      --color-text-secondary: #334155;
      --color-text-muted: #595959;
      --color-bg: #FFFFFF;
      --color-bg-alt: #F8FAFC;
      --color-border: #E2E8F0;
      --font-heading: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --space-xs: 0.25rem;
      --space-sm: 0.5rem;
      --space-md: 1rem;
      --space-lg: 1.5rem;
      --space-xl: 2rem;
      --radius-sm: 4px;
      --radius-md: 6px;
      --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font-body);
      font-size: 1rem;
      line-height: 1.65;
      color: var(--color-text);
      background-color: var(--color-bg-alt);
      -webkit-font-smoothing: antialiased;
    }
    h1, h2, h3, h4 {
      font-family: var(--font-heading);
      color: var(--color-text);
      text-wrap: balance;
    }
    th {
      font-family: var(--font-body);
      color: var(--color-text);
    }
    p, td, dd, li {
      text-wrap: pretty;
    }
    a { color: inherit; text-decoration: none; }
    button, select { font: inherit; }
    table { border-collapse: collapse; }
    .skip-link { position: absolute; top: -100px; left: 16px; background: #0041A5; color: #fff; padding: 8px 16px; border-radius: 4px; z-index: 1000; font-weight: 600; }
    .skip-link:focus { top: 16px; }

    /* CAPHE Site Shell Navigation & Footer */
    .nav-top-bar { background: #003080; color: rgba(255,255,255,0.9); font-size: 0.875rem; padding: 0.375rem 0; }
    .nav-top-bar .container { max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; display: flex; justify-content: flex-end; align-items: center; gap: 1.5rem; }
    .nav-top-bar a { color: rgba(255,255,255,0.9); transition: color 0.15s; }
    .nav-top-bar a:hover { color: #fff; text-decoration: none; }
    .nav-top-bar .nav-top-cta { background: #F9A825; color: #003080 !important; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 4px; }
    .nav { background: #fff; border-bottom: 1px solid #E2E8F0; position: sticky; top: 0; z-index: 100; }
    .nav-container { max-width: 1280px; margin: 0 auto; padding: 0.875rem 1.5rem; display: flex; align-items: center; justify-content: space-between; }
    .nav-logo { display: flex; align-items: center; gap: 0.625rem; font-family: var(--font-heading); font-weight: 700; font-size: 1.25rem; color: #003080; text-decoration: none; }
    .nav-logo img { height: 40px; width: auto; }
    .nav-logo-text { font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: #0041A5; }
    .nav-links { display: flex; align-items: center; gap: 2rem; }
    .nav-link { font-family: var(--font-heading); font-size: 0.875rem; font-weight: 600; color: #334155; text-transform: uppercase; letter-spacing: 0.5px; padding: 0.5rem 0; border-bottom: 2px solid transparent; transition: all 0.2s; text-decoration: none; }
    .nav-link:hover, .nav-link.active { color: #0041A5; text-decoration: none; }
    .nav-link.active { border-bottom-color: #F9A825; }
    .nav-dropdown { position: relative; display: flex; align-items: center; }
    .nav-dropdown-menu { display: none; position: absolute; top: 100%; left: 0; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px; box-shadow: 0 8px 24px rgba(0,0,0,0.1); min-width: 210px; padding: 0.5rem 0; z-index: 200; }
    .nav-dropdown:hover .nav-dropdown-menu, .nav-dropdown:focus-within .nav-dropdown-menu { display: block; }
    .nav-dropdown-menu a { display: block; padding: 0.5rem 1.25rem; font-size: 0.875rem; color: #334155; text-transform: none; letter-spacing: 0; text-decoration: none; }
    .nav-dropdown-menu a:hover { background: #F8FAFC; color: #0041A5; }
    .nav-mobile-toggle { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 0.5rem; }
    .nav-mobile-toggle span { display: block; width: 24px; height: 2px; background: #1C1C1C; }

    .footer { background: #0F172A; color: #CBD5E1; padding: 3.5rem 0 2rem; margin-top: 4rem; border-top: 1px solid #1E293B; }
    .footer .container { max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; }
    .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 2rem; margin-bottom: 2rem; }
    .footer-grid h4 { font-family: var(--font-heading); font-size: 0.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #fff; margin-bottom: 0.75rem; }
    .footer-grid a { display: block; color: #CBD5E1; font-size: 0.9375rem; margin-bottom: 0.4rem; text-decoration: none; }
    .footer-grid a:hover { color: #fff; text-decoration: underline; }
    .footer-brand p { font-size: 0.9375rem; color: #94A3B8; margin-top: 0.5rem; line-height: 1.5; }
    .footer-bottom { border-top: 1px solid #1E293B; padding-top: 1.25rem; font-size: 0.875rem; color: #94A3B8; }

    /* Compiled Layout & Typography Utilities */
    .antialiased { -webkit-font-smoothing: antialiased; }
    .max-w-6xl { max-width: 71.25rem; }
    .max-w-4xl { max-width: 56rem; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
    .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
    .px-2\\.5 { padding-left: 0.625rem; padding-right: 0.625rem; }
    .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
    .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
    .py-3\\.5 { padding-top: 0.875rem; padding-bottom: 0.875rem; }
    .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
    .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
    .py-1\\.5 { padding-top: 0.375rem; padding-bottom: 0.375rem; }
    .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
    .p-6 { padding: 1.5rem; }
    .p-5 { padding: 1.25rem; }
    .p-4 { padding: 1rem; }
    .pb-6 { padding-bottom: 1.5rem; }
    .pb-5 { padding-bottom: 1.25rem; }
    .pb-4 { padding-bottom: 1rem; }
    .pt-3 { padding-top: 0.75rem; }
    .pt-2 { padding-top: 0.5rem; }
    .mb-10 { margin-bottom: 2.5rem; }
    .mb-8 { margin-bottom: 2rem; }
    .mb-6 { margin-bottom: 1.5rem; }
    .mb-3 { margin-bottom: 0.75rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-1\\.5 { margin-bottom: 0.375rem; }
    .mb-1 { margin-bottom: 0.25rem; }
    .mb-0\\.5 { margin-bottom: 0.125rem; }
    .mt-3 { margin-top: 0.75rem; }
    .mt-1 { margin-top: 0.25rem; }
    .mt-0\\.5 { margin-top: 0.125rem; }
    .my-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
    .my-1\\.5 { margin-top: 0.375rem; margin-bottom: 0.375rem; }
    .ml-2 { margin-left: 0.5rem; }
    .space-y-3 > * + * { margin-top: 0.75rem; }
    .space-y-2\\.5 > * + * { margin-top: 0.625rem; }
    .space-y-1\\.5 > * + * { margin-top: 0.375rem; }
    .space-x-2 > * + * { margin-left: 0.5rem; }
    .flex { display: flex; }
    .inline-block { display: inline-block; }
    .grid { display: grid; }
    .block { display: block; }
    .flex-col { flex-direction: column; }
    .flex-wrap { flex-wrap: wrap; }
    .flex-shrink-0 { flex-shrink: 0; }
    .items-center { align-items: center; }
    .items-baseline { align-items: baseline; }
    .justify-between { justify-content: space-between; }
    .align-top { vertical-align: top; }
    .gap-5 { gap: 1.25rem; }
    .gap-3 { gap: 0.75rem; }
    .gap-2 { gap: 0.5rem; }
    .gap-1\\.5 { gap: 0.375rem; }
    .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
    .w-full { width: 100%; }
    .col-label { width: 22%; }
    .col-data { width: 19.5%; }
    .w-4 { width: 1rem; }
    .h-4 { height: 1rem; }
    .min-w-\\[860px\\] { min-width: 860px; }
    .overflow-hidden { overflow: hidden; }
    .overflow-x-auto { overflow-x: auto; }
    .rounded-xl { border-radius: 0.75rem; }
    .rounded-lg { border-radius: 0.5rem; }
    .rounded-md { border-radius: 0.375rem; }
    .rounded { border-radius: 0.25rem; }
    .border { border-width: 1px; border-style: solid; border-color: #E2E8F0; }
    .border-b { border-bottom: 1px solid #E2E8F0; }
    .border-t { border-top: 1px solid #E2E8F0; }
    .border-l { border-left: 1px solid #E2E8F0; }
    .border-y-2 { border-top-width: 2px; border-bottom-width: 2px; border-style: solid; }
    .border-t-2 { border-top-width: 2px; border-top-style: solid; }
    .border-l-4 { border-left-width: 4px; border-left-style: solid; }
    .border-collapse { border-collapse: collapse; }
    .border-slate-300 { border-color: #CBD5E1; }
    .border-slate-200 { border-color: #E2E8F0; }
    .border-slate-200\\/80 { border-color: rgba(226, 232, 240, 0.8); }
    .border-slate-200\\/60 { border-color: rgba(226, 232, 240, 0.6); }
    .border-blue-200 { border-color: #BFDBFE; }
    .border-amber-300 { border-color: #FCD34D; }
    .border-rose-200 { border-color: #FECDD3; }
    .border-rose-300 { border-color: #FDA4AF; }
    .border-emerald-200 { border-color: #A7F3D0; }
    .border-\\[\\#0041A5\\] { border-color: #0041A5; }
    .bg-white { background-color: #FFFFFF; }
    .bg-slate-50 { background-color: #F8FAFC; }
    .bg-slate-50\\/70 { background-color: rgba(248, 250, 252, 0.7); }
    .bg-slate-100 { background-color: #F1F5F9; }
    .bg-slate-200 { background-color: #E2E8F0; }
    .bg-blue-50\\/60 { background-color: rgba(239, 246, 255, 0.6); }
    .bg-blue-50\\/40 { background-color: rgba(239, 246, 255, 0.65); }
    .bg-blue-50\\/20 { background-color: rgba(239, 246, 255, 0.35); }
    .bg-blue-600 { background-color: #0041A5; }
    .bg-amber-200 { background-color: #FDE68A; }
    .bg-rose-50\\/50 { background-color: rgba(255, 241, 242, 0.5); }
    .bg-rose-100\\/50 { background-color: rgba(255, 228, 230, 0.5); }
    .bg-rose-200 { background-color: #FECDD3; }
    .bg-emerald-50 { background-color: #ECFDF5; }
    .bg-emerald-50\\/70 { background-color: rgba(236, 253, 245, 0.75); }
    .bg-emerald-100\\/60 { background-color: rgba(209, 250, 229, 0.65); }
    .text-left { text-align: left; }
    .text-2xl { font-size: 1.5rem; line-height: 1.95rem; }
    .text-xl { font-size: 1.25rem; line-height: 1.7rem; }
    .text-lg { font-size: 1.125rem; line-height: 1.65rem; }
    .text-base { font-size: 1rem; line-height: 1.55rem; }
    .text-sm { font-size: 0.95rem; line-height: 1.52rem; }
    .text-\\[13\\.5px\\] { font-size: 0.925rem; line-height: 1.5rem; }
    .text-xs { font-size: 0.875rem; line-height: 1.42rem; }
    .font-bold { font-weight: 700; }
    .font-semibold { font-weight: 600; }
    .font-medium { font-weight: 500; }
    .font-normal { font-weight: 400; }
    .font-sans { font-family: var(--font-body); }
    .font-mono { font-family: var(--font-body); font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }
    .font-\\[\\'Montserrat\\'\\] { font-family: var(--font-body); }
    .font-\\[\\'Source_Sans_Pro\\'\\] { font-family: var(--font-body); }
    .uppercase { text-transform: uppercase; }
    .tracking-wider { letter-spacing: 0.04em; }
    .tracking-tight { letter-spacing: -0.015em; }
    .leading-tight { line-height: 1.25; }
    .leading-snug { line-height: 1.42; }
    .leading-relaxed { line-height: 1.62; }
    .opacity-90 { opacity: 0.9; }
    .text-white { color: #FFFFFF; }
    .text-slate-950 { color: #020617; }
    .text-slate-900 { color: #0F172A; }
    .text-slate-800 { color: #1E293B; }
    .text-slate-700 { color: #334155; }
    .text-slate-600 { color: #475569; }
    .text-slate-500 { color: #595959; }
    .text-amber-800 { color: #92400E; }
    .text-rose-950 { color: #4C0519; }
    .text-rose-800 { color: #9F1239; }
    .text-rose-700 { color: #BE123C; }
    .text-emerald-950 { color: #022C22; }
    .text-emerald-900 { color: #064E3B; }
    .text-emerald-800 { color: #065F46; }
    .text-\\[\\#003080\\] { color: #003080; }
    .text-\\[\\#0041A5\\] { color: #0041A5; }
    .underline { text-decoration: underline; }
    .shadow-sm { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.07); }
    .cursor-pointer { cursor: pointer; }
    .select-none { user-select: none; }
    .list-none { list-style: none; }
    .transition-colors { transition: background-color 0.15s ease, color 0.15s ease; }
    .transition-transform { transition: transform 0.2s ease; }
    .duration-200 { transition-duration: 200ms; }
    .hover\\:bg-slate-100:hover { background-color: #F1F5F9; }
    .hover\\:bg-slate-200:hover { background-color: #E2E8F0; }
    .hover\\:bg-slate-50\\/50:hover { background-color: rgba(248, 250, 252, 0.65); }
    .hover\\:text-\\[\\#003080\\]:hover { color: #003080; }
    .focus\\:outline-none:focus { outline: none; }
    .focus\\:ring-2:focus { box-shadow: 0 0 0 2px #0041A5; }
    .focus\\:ring-\\[\\#0041A5\\]:focus { box-shadow: 0 0 0 2px #0041A5; }
    .focus\\:ring-inset:focus { box-shadow: inset 0 0 0 2px #0041A5; }
    .divide-y > * + * { border-top: 1px solid #E2E8F0; }
    .divide-slate-200 > * + * { border-color: #E2E8F0; }
    .sr-only {
      position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
      overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;
    }
    details > summary { list-style: none; }
    details > summary::-webkit-details-marker { display: none; }
    details[open] .group-open\\:rotate-90 { transform: rotate(90deg); }

    /* Option C Visual Components */
    .ruler-svg-frame {
      margin: 0.65rem 0 0.65rem;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      overflow: hidden;
      background: #F8FAFC;
    }
    .col-header-img {
      width: 100%;
      height: 68px;
      object-fit: cover;
      border-radius: 6px;
      margin-bottom: 0.5rem;
      border: 1px solid #E2E8F0;
      display: block;
    }
    .col-header-banner {
      width: 100%;
      height: 68px;
      border-radius: 6px;
      margin-bottom: 0.5rem;
      border: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .budget-bar-track {
      height: 22px;
      background: #E2E8F0;
      border-top: 1px solid #CBD5E1;
      overflow: hidden;
      display: flex;
      font-size: 0.72rem;
      font-weight: 700;
      color: #fff;
      margin: 0;
    }
    .budget-bar-seg {
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      overflow: hidden;
      padding: 0 4px;
    }
    .budget-bar-seg[data-pct]::after {
      content: attr(data-pct);
      font-family: 'SF Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .seg-rent, .seg-Housing { background: #BE123C; color: #fff; }
    .seg-food { background: #F59E0B; color: #1C1C1C; }
    .seg-rest { background: #0F766E; color: #fff; }
    .seg-gross { background: #475569; color: #fff; }
    .seg-primary { background: #0041A5; color: #fff; }

    .bar-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem 0.625rem;
      margin-bottom: 0.55rem;
    }
    .bar-legend-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: #1E293B;
      background: rgba(241, 245, 249, 0.9);
      border: 1px solid #CBD5E1;
      border-radius: 4px;
      padding: 0.15rem 0.45rem;
      line-height: 1.3;
    }
    .bar-legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 2px;
      flex-shrink: 0;
    }

    .inline-mini-bar {
      height: 7px;
      background: #E2E8F0;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      margin-top: 6px;
    }
    .tag-unit {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      background: #E2E8F0;
      color: #334155;
      margin-bottom: 0.3rem;
    }
    .tag-unit-tract {
      background: #DBEAFE;
      color: #003080;
    }

    @media (min-width: 640px) {
      .sm\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
      .sm\\:p-6 { padding: 1.5rem; }
      .sm\\:text-3xl { font-size: 1.875rem; line-height: 2.3rem; }
      .sm\\:text-2xl { font-size: 1.45rem; line-height: 1.9rem; }
      .sm\\:text-xl { font-size: 1.25rem; line-height: 1.7rem; }
      .sm\\:text-lg { font-size: 1.125rem; line-height: 1.65rem; }
      .sm\\:text-base { font-size: 1rem; line-height: 1.55rem; }
      .sm\\:text-sm { font-size: 0.95rem; line-height: 1.52rem; }
      .sm\\:text-\\[13\\.5px\\] { font-size: 0.925rem; line-height: 1.5rem; }
      .sm\\:flex-row { flex-direction: row; }
      .sm\\:items-center { align-items: center; }
      .sm\\:items-baseline { align-items: baseline; }
      .sm\\:inline { display: inline; }
      .sm\\:ml-1 { margin-left: 0.25rem; }
      .sm\\:mt-0 { margin-top: 0; }
      .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
    .whitespace-nowrap { white-space: nowrap; }
    @media (min-width: 768px) {
      .md\\:py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
      .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .md\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      .md\\:flex-row { flex-direction: row; }
      .md\\:items-center { align-items: center; }
      .md\\:hidden { display: none; }
    }
    @media (min-width: 1024px) {
      .lg\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
      .lg\\:text-4xl { font-size: 2.125rem; line-height: 2.55rem; }
    }
    @media (max-width: 900px) {
      .nav-links { display: none; position: absolute; top: 100%; left: 0; right: 0; background: #fff; flex-direction: column; padding: 1.5rem; border-bottom: 1px solid #E2E8F0; box-shadow: 0 8px 24px rgba(0,0,0,0.1); gap: 1rem; }
      .nav-links.active { display: flex; }
      .nav-mobile-toggle { display: flex; }
      .nav-dropdown-menu { position: static; box-shadow: none; border: none; padding-left: 1.5rem; }
    }
  </style>
  <script type="application/ld+json">
${JSON.stringify(articleLd, null, 2)}
  </script>
  <!-- geo:faq:start -->
  <script type="application/ld+json">
${JSON.stringify(faqLd, null, 2)}
  </script>
  <!-- geo:faq:end -->
</head>
<body class="antialiased">

  <!-- Top Bar -->
  <div class="nav-top-bar">
    <div class="container">
      <a href="/contact">Contact</a>
      <a href="/login">Log In</a>
      <a href="/membership" class="nav-top-cta">Join CAPHE</a>
    </div>
  </div>

  <!-- Navigation -->
  <nav class="nav" aria-label="Site Navigation">
    <div class="nav-container">
      <a href="/" class="nav-logo">
        <img src="/assets/images/logo-icon.png" alt="CAPHE" onerror="this.style.display='none'">
        <div class="nav-logo-text">CAPHE</div>
      </a>
      <div class="nav-links">
        <a href="/about" class="nav-link">About</a>
        <div class="nav-dropdown">
          <a href="/programs" class="nav-link">Programs &#9662;</a>
          <div class="nav-dropdown-menu">
            <a href="/programs#webinars">Webinars</a>
            <a href="/programs#workshops">Workshops</a>
            <a href="/programs#working-groups">Working Groups</a>
            <a href="/programs#peer-review">Peer Review Sessions</a>
            <a href="/past-events">Past Events</a>
          </div>
        </div>
        <div class="nav-dropdown">
          <a href="/resources" class="nav-link active">Resources &#9662;</a>
          <div class="nav-dropdown-menu">
            <a href="/methods-lab">Case Studies</a>
            <a href="/resources#external-resources">External Resources</a>
            <a href="/tools/lha-calculator">ROI Calculator</a>
            <a href="/tools/access-explorer">Access Explorer</a>
          </div>
        </div>
      </div>
      <button class="nav-mobile-toggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- MAIN CONTENT -->
  <main id="main-content" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">

    <!-- BLOCK 1: CONCISE EXECUTIVE HEADER -->
    <div class="border-b border-slate-200 pb-6 mb-8">
      <div class="text-xs font-bold text-[#0041A5] mb-2">
        CAPHE Case Studies &middot; ${simplifyToGrade7(spec.trackEyebrow.split('&middot;')[0].replace(/^Track\s*\d+\s*:\s*/i, '').trim())}
      </div>
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#003080] tracking-tight leading-tight max-w-4xl mb-2">
        ${spec.h1}
      </h1>
      <p class="text-lg sm:text-xl text-slate-800 font-semibold tracking-tight max-w-4xl mb-3">
        ${stripVisibleModeTag(simplifyToGrade7(spec.subtitle))}
      </p>
      <!-- geo:answer:start -->
      <p class="answer-block text-base sm:text-lg text-slate-700 max-w-4xl leading-relaxed">
        ${stripVisibleModeTag(renderedAnswerHtml)}
      </p>
      <!-- geo:answer:end -->
    </div>

    <!-- BLOCK 3: TABLE 1 QUANTITATIVE MATRIX -->
    <div class="mb-3">
      <h2 class="text-xl sm:text-2xl font-bold text-slate-950">${stripVisibleModeTag(simplifyToGrade7(spec.table1.title))}</h2>
      <p class="text-sm text-slate-600 mt-1 max-w-4xl">
        ${t1SubSplit.visibleSub}
      </p>
    </div>

    <div class="text-xs text-slate-500 font-medium mb-2 md:hidden">
      Scroll side to side to see all 4 columns &rarr;
    </div>

    <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8">
      <div class="overflow-x-auto">
        <table class="min-w-[860px] w-full text-left border-collapse" id="quantitativeComparisonTable">
          <caption class="sr-only">${stripVisibleModeTag(simplifyToGrade7(spec.table1.caption))}</caption>
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th scope="col" class="py-4 px-5 text-xs font-bold text-slate-700 col-label align-top">
                ${simplifyToGrade7(spec.table1.cornerLabel || 'Data Measure')}
              </th>
${table1HeadersHtml}
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 text-sm">
${table1RowsHtml}
          </tbody>
        </table>
      </div>${table1FootnoteHtml}${tetsStripHtml}
    </div>

    <!-- BLOCK 4: TABLE 2 CONTEXT, TRADEOFFS & POLICY FIT -->
    <div class="mb-3">
      <h2 class="text-xl sm:text-2xl font-bold text-slate-950">${stripVisibleModeTag(simplifyToGrade7(spec.table2.title))}</h2>
      <p class="text-sm text-slate-600 mt-1 max-w-4xl">
        ${t2SubSplit.visibleSub}
      </p>
    </div>

    <div class="text-xs text-slate-500 font-medium mb-2 md:hidden">
      Scroll side to side to see all 4 columns &rarr;
    </div>

    <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8">
      <div class="overflow-x-auto">
        <table class="min-w-[860px] w-full text-left border-collapse" id="policyFitTable">
          <caption class="sr-only">${stripVisibleModeTag(simplifyToGrade7(spec.table2.caption))}</caption>
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th scope="col" class="py-3.5 px-5 text-xs font-bold text-slate-800 col-label align-top">
                ${simplifyToGrade7(spec.table2.cornerLabel || 'Choice Factor')}
              </th>
${renderTable2Headers(spec.table2.colHeaders || spec.table1.columns.map(c => ({ title: c.title })))}
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 text-sm">
${table2RowsHtml}
          </tbody>
        </table>
      </div>
      <details class="group bg-slate-50 border-t border-slate-200 text-sm text-slate-700">
        <summary class="px-5 py-3.5 cursor-pointer list-none flex items-center justify-between hover:bg-slate-100 transition-colors select-none focus:outline-none focus:ring-2 focus:ring-[#0041A5] focus:ring-inset">
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-[#0041A5] transition-transform duration-200 group-open:rotate-90 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
            <span class="font-bold text-slate-900">${simplifyToGrade7(spec.table2.notesTitle || 'Table 2 Notes: Sample Scope &amp; Check Benchmarks')}</span>
          </div>
          <span class="text-xs font-semibold text-[#0041A5] bg-white border border-slate-300 rounded px-2.5 py-1 whitespace-nowrap">Expand notes</span>
        </summary>
        <div class="px-5 pb-4 pt-3 border-t border-slate-200/60 leading-relaxed space-y-2">
          ${t2NotesCombined.map(b => `<p>&bull; ${b}</p>`).join('\n          ')}
        </div>
      </details>
    </div>
${interactiveHtml}
    <!-- BLOCK 5: COLLAPSIBLE DATA SOURCES, MODEL ASSUMPTIONS, SYNTHESIS, FAQS & ENDNOTES -->
    <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8">
      <details id="data-sources-endnotes" class="group bg-slate-50 text-sm text-slate-700">
        <summary class="px-5 py-3.5 cursor-pointer list-none flex items-center justify-between hover:bg-slate-100 transition-colors select-none focus:outline-none focus:ring-2 focus:ring-[#0041A5] focus:ring-inset">
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-[#0041A5] transition-transform duration-200 group-open:rotate-90 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
            <span class="font-bold text-slate-900">Data Sources, Model Inputs, Notes &amp; Endnotes</span>
            <span class="text-xs text-slate-500 font-normal ml-2">(Numbered endnotes [1]&ndash;[${endnoteEntries.length}], state data sources &amp; math rules)</span>
          </div>
          <span class="text-xs font-semibold text-[#0041A5] bg-white border border-slate-300 rounded px-2.5 py-1 whitespace-nowrap">Expand details</span>
        </summary>
        <div class="px-5 pb-5 pt-3 border-t border-slate-200/60 leading-relaxed space-y-3">
          <p class="text-xs text-slate-600"><strong>Case Study Focus:</strong> ${simplifyToGrade7(spec.trackEyebrow.replace(/^Track\s*\d+\s*:\s*/i, ''))}</p>
          ${endnoteEntries.length > 0 ? `<div class="pb-3 border-b border-slate-200/80">
            <h3 class="text-sm font-bold text-slate-900 mb-2">Numbered Endnotes &amp; Main Sources</h3>
            <ol class="list-none pl-0 space-y-1 text-xs sm:text-sm text-slate-800">
              ${endnoteEntries.map((e, idx) => `<li id="endnote-${idx + 1}"><span class="font-bold text-[#0041A5] mr-1.5">[${idx + 1}]</span>${e}</li>`).join('\n              ')}
            </ol>
          </div>` : ''}
          <div class="pb-3 border-b border-slate-200/80 space-y-2">
            <h3 class="text-sm font-bold text-slate-900">${simplifyToGrade7(spec.synthesis.title)}</h3>
            <p class="text-slate-800">${simplifyToGrade7(spec.synthesis.p1)}</p>
            <p class="text-slate-800">${simplifyToGrade7(spec.synthesis.p2)}</p>
          </div>
          ${(spec.methodologyParagraphs || []).map(p => `<p>${simplifyToGrade7(p)}</p>`).join('\n          ')}${tetsCalloutHtml}
          <div class="pt-3 border-t border-slate-200/80">
            <h3 class="text-sm font-bold text-slate-900 mb-2">Common Questions &amp; Method Notes</h3>
            <dl class="space-y-2.5">
              ${spec.faqs.map(q => `<div>\n                <dt class="font-bold text-slate-900">${simplifyToGrade7(q.question)}</dt>\n                <dd class="text-slate-700 mt-0.5">${simplifyToGrade7(q.answer)}</dd>\n              </div>`).join('\n              ')}
            </dl>
          </div>
        </div>
      </details>
    </div>

    <!-- related:start -->
    <section class="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 mb-4 shadow-sm" aria-label="Related Case Studies">
      <h2 class="text-base sm:text-lg font-bold text-[#003080] mb-2">Related Case Studies</h2>
      <ul class="list-none text-sm">
${relatedLinksHtml}
      </ul>
      <p class="text-xs text-slate-600 mt-3"><a href="/methods-lab" class="text-[#0041A5] font-bold underline">Browse all California public health case studies &rarr;</a></p>
    </section>
    <!-- related:end -->

  </main>

  <!-- FOOTER -->
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="nav-logo-text" style="color: white;">
            CAPHE
            <span style="color: rgba(255,255,255,0.75); display: block; font-size: 0.85rem; font-weight: 400;">California Association of Public Health Economists</span>
          </div>
          <p>
            A professional association supporting health economics and policy evaluation across
            California's state and local public health departments.
          </p>
        </div>
        <div>
          <h4>Programs</h4>
          <a href="/programs#workshops">Workshops</a>
          <a href="/programs#webinars">Webinars</a>
          <a href="/programs#working-groups">Working Groups</a>
        </div>
        <div>
          <h4>Resources</h4>
          <a href="/methods-lab">Case Studies</a>
          <a href="/resources#external-resources">External Resources</a>
          <a href="/tools/lha-calculator">ROI Calculator</a>
          <a href="/tools/access-explorer">Access Explorer</a>
        </div>
        <div>
          <h4>Connect</h4>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/membership">Membership</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 California Association of Public Health Economists. All rights reserved.</p>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">
          <a href="/privacy" style="color: rgba(255,255,255,0.7);">Privacy Policy</a> &middot;
          <a href="/terms" style="color: rgba(255,255,255,0.7);">Terms of Use</a>
        </p>
      </div>
    </div>
  </footer>
  <script src="/src/frontend/js/main.js"></script>
</body>
</html>
`;

  if (html.includes('\u2014') || html.includes('&mdash;')) {
    throw new Error(`[${spec.slug}] Em-dash detected in generated HTML! Strictly forbidden by style-pass.`);
  }
  const extLinks = (html.match(/href="https:\/\/[^"]+"/g) || []).filter(h => !h.includes('fonts.googleapis.com') && !h.includes('fonts.gstatic.com') && !h.includes('caphegroup.org'));
  if (extLinks.length < 4) {
    throw new Error(`[${spec.slug}] Expected >= 4 external citation links in body, found ${extLinks.length}`);
  }

  const outPath = path.join(__dirname, '..', 'public', 'methods-lab', spec.slug, 'index.html');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`Rendered [${spec.slug}] -> ${outPath} (title=${spec.pageTitle.length}c, answer=${answerWords}w, extLinks=${extLinks.length})`);
}

module.exports = { renderModuleHtml };
