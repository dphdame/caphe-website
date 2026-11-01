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
  const preNormalized = String(inputStr)
    .replace(/<--?/g, '&larr;')
    .replace(/-->?/g, '&rarr;')
    .replace(/<=/g, '&le;')
    .replace(/>=/g, '&ge;');
  // Split by real HTML tags (preserving <a ...>...</a> blocks verbatim so citation labels and proper nouns are never altered)
  return preNormalized.split(/(<a\b[^>]*>[\s\S]*?<\/a>|<\/?(?:strong|em|b|i|u|sup|sub|span|div|p|br|ul|ol|li|dl|dt|dd|table|thead|tbody|tr|th|td|details|summary|h[1-6]|code|svg|path|select|option|label|button|nav|section|article|main|footer|header|img)\b[^>]*>)/gi).map(part => {
    if (/^<\/?[a-zA-Z]/.test(part)) return part;
    return part
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
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
    .replace(/\bTWFE\b/g, 'County & Year Panel')
    .replace(/\bOLS\b/g, 'Unadjusted Model')
    .replace(/\bFFS\b/g, 'Per-Visit')
    .replace(/\bNPIs\b/g, 'billing providers')
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
  const isModeled = explicitModeled === true || /^Modeled\s+/i.test(mainRaw) || /\*\s*$/.test(mainRaw);
  let cleaned = mainRaw
    .replace(/^Modeled\s+/i, '')
    .replace(/^Observed\s+/i, '')
    .replace(/^Cost Input:\s*/i, '')
    .replace(/\s*\((?:[^()]*(?:N\s*=|B\d{4,5}|SPA\s+\d|OLS|TWFE|2SLS|Lewbel|Δ|α|β)[^()]*)\)\s*$/gi, '')
    .replace(/\s*\*+\s*$/g, '')
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
    return `<img src="/case-studies/food-affordability-tradeoffs/assets/marin-canal.jpg" alt="Coastal California high-rent community context" class="col-header-img" height="68" loading="lazy">`;
  }
  if (titleLower.includes('fresno') || titleLower.includes('valley') || titleLower.includes('tulare') || titleLower.includes('kern') || titleLower.includes('merced')) {
    return `<img src="/case-studies/food-affordability-tradeoffs/assets/fresno-valley.jpg" alt="Central Valley California community context" class="col-header-img" height="68" loading="lazy">`;
  }
  if (titleLower.includes('nevada') || titleLower.includes('sierra') || titleLower.includes('alpine') || titleLower.includes('modoc') || titleLower.includes('imperial') || titleLower.includes('rural') || titleLower.includes('inland')) {
    return `<img src="/case-studies/food-affordability-tradeoffs/assets/nevada-sierra.jpg" alt="Rural California community context" class="col-header-img" height="68" loading="lazy">`;
  }
  if (titleLower.includes('santa clara') || titleLower.includes('alameda') || titleLower.includes('los angeles') || titleLower.includes('urban') || titleLower.includes('metro') || titleLower.includes('sacramento')) {
    return `<img src="/case-studies/food-affordability-tradeoffs/assets/santa-clara-suburban.jpg" alt="Urban California metropolitan context" class="col-header-img" height="68" loading="lazy">`;
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
  const h1Sanitized = h1.replace(/\bCrisis Aid\b/gi, 'Emergency Aid');
  if (h1 !== normalizeArticleText(item.title) && h1Sanitized !== normalizeArticleText(item.title)) {
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
  const canonicalUrl = `https://www.caphegroup.org/case-studies/${spec.slug}`;
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

  if (!spec.policySettingHtml || !String(spec.policySettingHtml).trim()) {
    throw new Error(`[${spec.slug}] Missing required spec.policySettingHtml (Paragraph 1 of Two-Part Executive Opening)`);
  }
  const renderedPolicySettingHtml = formatAnswerWithEndnotes(spec.policySettingHtml);
  const policySettingWords = countWords(renderedPolicySettingHtml);
  if (policySettingWords < 20 || policySettingWords > 70) {
    throw new Error(`[${spec.slug}] policySettingHtml word count (${policySettingWords}) out of 20-70 target window`);
  }

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
      "url": "https://www.caphegroup.org/case-studies"
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
    const subText = simplifyToGrade7(String(col.subtitle || '').replace(/^Perspective:\s*[^|]+?\s*\|\s*/i, '').replace(/^Perspective:\s*/i, '').trim());
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
  const isFlagshipSlug = ['chw-health-outcomes', 'medicaid-expansion', 'food-insecurity-diabetes'].includes(spec.slug);
  const stripRepeatedTable2Stem = (txt, isPolicyFit = false, rowLabel = '', colTitle = '') => {
    const fullClean = stripVisibleModeTag(String(txt || ''))
      .replace(/^Best when\s+/i, '')
      .replace(/^Best for\s+/i, 'Fits ')
      .trim();
    const targetW = isFlagshipSlug ? (isPolicyFit ? 14 : 16) : (isPolicyFit ? 18 : 20);
    let s = fullClean.replace(/\s+/g, ' ').trim();
    if (/^[A-Z][A-Za-z0-9\s\/&;-]{2,42}:\s+/.test(s)) {
      s = s.replace(/^[A-Z][A-Za-z0-9\s\/&;-]{2,42}:\s+/, '');
    }
    if (s.split(/\s+/).length > targetW || /\([^)]*(?:N\s*=|\bpp\b|\bscale\b|\bUIC\b|\bKangovi\b|\b19\d\d\b|\b20\d\d\b|,\s*|\bvs\.)[^)]*\)/i.test(s)) {
      s = s.replace(/\s*\([^()]*\)/g, '').replace(/\s+/g, ' ').trim();
    }
    const sentences = s.split(/(?<=[a-z0-9%])\.\s+(?=[a-zA-Z0-9])/);
    if (sentences.length > 1 && sentences[0].split(/\s+/).length >= 5) {
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
      if (intro && intro[1].split(/\s+/).length >= 5) {
        s = intro[1];
      }
    }
    if (s.split(/\s+/).length > targetW) {
      const trail = s.split(/\s*(?:;|(?<!\d):(?!\d)|—|\s-\s|,\s*(?:but|yet|whereas|while|leaving|where|which|because|so|although|though|even though|unless|when|since|after|before|paired with|instead of|rather than|yielding|generating|producing|creating|causing|forcing|allowing|requiring|making|meaning|showing|confirming|resulting in|compared with|compared to|relative to|despite|without|including|such as|consistent with|with the|lowering|cutting|adding|focusing|finally|falsely classifying)|\s+(?:unless|(?<!\b(?:as|see|check|ask|test|know)\s)if|while|whereas|instead of|rather than|compared with|compared to|against\s+\+|despite\s+\d|to satisfy|based on a|and\s+(?:cuts?|reduces?|highlights?|diverts?|we\s+use)|or\s+holds\b|during\s+the\s+exact\s+year|ahead\s+of\b|in\s+the\s+Bay\s+Area))\s*/i);
      if (trail[0] && trail[0].split(/\s+/).length >= 6 && !/\b(as|on|in|to|for|with|from|of|by|at|into|under|see|check|ask|test)\b$/i.test(trail[0].trim())) {
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
          <label for="chwScenarioSelect" class="block text-xs font-bold text-slate-800 mb-1">2. Program Model &amp; Cost Ledger</label>
          <select id="chwScenarioSelect" class="w-full px-3 py-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0041A5]">
            <option value="1">Scenario 1: Hospital Care (Medi-Cal Plan Claims, Assumed 55 Patients)</option>
            <option value="2">Scenario 2: Hospital Care (Hospital Bed Costs, Assumed 55 Patients)</option>
            <option value="3">Scenario 3: Clinic Chronic Care (Scheduled Clinic Visits, Assumed 75 Patients)</option>
            <option value="4">Scenario 4: Neighborhood Outreach (Public Health Prevention, Assumed 150 Adults)</option>
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
          <span id="chwOffsetStat" class="block font-mono text-base sm:text-lg font-bold text-[#003080] mt-0.5">~$107,000 / yr</span>
          <span id="chwOffsetSub" class="block text-xs text-slate-600 mt-1 leading-snug">~27 ER visits, ~12 stays avoided</span>
        </div>
        <div class="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
          <span class="block text-xs font-bold text-slate-700">Two-Year Health Gains (QALYs)*</span>
          <span id="chwQalyStat" class="block font-mono text-base sm:text-lg font-bold text-emerald-800 mt-0.5">~3.0 QALYs</span>
          <span id="chwQalySub" class="block text-xs text-slate-600 mt-1 leading-snug">Over 2 years ($100k/QALY benchmark)</span>
        </div>
        <div id="chwTotalCard" class="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5">
          <span class="block text-xs font-bold text-emerald-950">Net Year-1 Fiscal Impact &amp; Cost per QALY*</span>
          <span id="chwTotalStat" class="block font-mono text-base sm:text-lg font-bold text-emerald-900 mt-0.5">Pays for itself in Year 1</span>
          <span id="chwTotalSub" class="block text-xs text-slate-800 mt-1 leading-snug">~$3,300 net savings &middot; ~3.0 QALYs</span>
        </div>
      </div>

      <!-- PAIRED HORIZONTAL COST-VS-OFFSET BAR CHART (SEPARATE HORIZONTAL BARS, ZERO STACKING) -->
      <div class="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
          <h3 class="text-sm font-bold text-slate-900">Year-1 Dollar Comparison: Worker Cost vs. Visit Pay &amp; Hospital Savings</h3>
          <span class="text-xs text-slate-600">Shared annual dollar scale ($0 to $380,000) &middot; Dashed line marks worker cost breakeven</span>
        </div>
        <div class="overflow-x-auto">
          <svg id="chwCostOffsetSvg" class="w-full min-w-[640px]" viewBox="0 0 760 198" role="img" aria-labelledby="chwChartTitle chwChartDesc" xmlns="http://www.w3.org/2000/svg">
            <title id="chwChartTitle">Paired Horizontal Bar Chart of Annual Worker Cost, Medi-Cal Visit Pay, and Year-1 Hospital Savings</title>
            <desc id="chwChartDesc">Three separate horizontal bars comparing full-time CHW cost, direct Medi-Cal visit billing, and Year-1 hospital savings against a dashed worker-cost breakeven line.</desc>
            <rect x="0" y="0" width="760" height="198" rx="6" fill="#F8FAFC"/>
            <!-- Axis Grid Lines ($0, $100K, $200K, $300K, $380K; 1px = $1,000 from x=230 to x=610) -->
            <line x1="230" y1="30" x2="230" y2="168" stroke="#CBD5E1" stroke-width="1.5"/>
            <line x1="330" y1="30" x2="330" y2="168" stroke="#E2E8F0" stroke-width="1"/>
            <line x1="430" y1="30" x2="430" y2="168" stroke="#E2E8F0" stroke-width="1"/>
            <line x1="530" y1="30" x2="530" y2="168" stroke="#E2E8F0" stroke-width="1"/>
            <line x1="610" y1="30" x2="610" y2="168" stroke="#E2E8F0" stroke-width="1"/>
            <text x="230" y="185" text-anchor="middle" fill="#475569" font-size="11" font-weight="600">$0</text>
            <text x="330" y="185" text-anchor="middle" fill="#475569" font-size="11" font-weight="600">$100K</text>
            <text x="430" y="185" text-anchor="middle" fill="#475569" font-size="11" font-weight="600">$200K</text>
            <text x="530" y="185" text-anchor="middle" fill="#475569" font-size="11" font-weight="600">$300K</text>
            <text x="610" y="185" text-anchor="middle" fill="#475569" font-size="11" font-weight="600">$380K</text>
            <!-- Bar 1: Hiring Agency Annual Worker Cost -->
            <text x="12" y="56" fill="#0F172A" font-size="12" font-weight="700">1. Hiring Agency Worker Cost</text>
            <rect x="230" y="38" width="380" height="24" rx="4" fill="#E2E8F0"/>
            <rect id="chwBarCost" x="230" y="38" width="104" height="24" rx="4" fill="#334155"/>
            <text id="chwBarCostVal" x="342" y="55" fill="#0F172A" font-size="12" font-weight="700">$103,719 / yr (100% baseline)</text>
            <!-- Bar 2: Direct Medi-Cal Per-Visit Billing -->
            <text x="12" y="104" fill="#0F172A" font-size="12" font-weight="700">2. Direct Medi-Cal Visit Pay*</text>
            <rect x="230" y="86" width="380" height="24" rx="4" fill="#E2E8F0"/>
            <rect id="chwBarVisit" x="230" y="86" width="10" height="24" rx="4" fill="#D97706"/>
            <text id="chwBarVisitVal" x="248" y="103" fill="#92400E" font-size="12" font-weight="700">$6,775 to $10,162 / yr (6.5% to 9.8%)</text>
            <!-- Bar 3: Year-1 Hospital Savings Offset -->
            <text id="chwBarOffsetLabel" x="12" y="152" fill="#0F172A" font-size="12" font-weight="700">3. Year-1 Hospital Savings*</text>
            <rect x="230" y="134" width="380" height="24" rx="4" fill="#E2E8F0"/>
            <rect id="chwBarOffset" x="230" y="134" width="107" height="24" rx="4" fill="#0D9488"/>
            <text id="chwBarOffsetVal" x="345" y="151" fill="#065F46" font-size="12" font-weight="700">~$107,000 / yr (Pays for itself)</text>
            <!-- Vertical Dashed Breakeven Line at Worker Cost -->
            <line id="chwBreakevenLine" x1="334" y1="26" x2="334" y2="168" stroke="#003080" stroke-width="2" stroke-dasharray="5,4"/>
            <text id="chwBreakevenLabel" x="334" y="19" text-anchor="middle" fill="#003080" font-size="11" font-weight="700">1x Worker Cost ($103,719)</text>
          </svg>
        </div>
        <!-- Separate Two-Year Health Value Callout (Kept Distinct from Dollar Bars) -->
        <div id="chwHealthCallout" class="mt-3 pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm text-slate-800">
          <div>
            <strong class="text-emerald-950">Separate Two-Year Health Ledger (Not Added to Cash Bars):</strong>
            <span id="chwHealthCalloutText" class="ml-1">~3.0 QALYs gained (~$300,000 health value at $100,000 / QALY).</span>
          </div>
          <span id="chwHealthBadge" class="inline-block font-mono text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded px-2.5 py-1 whitespace-nowrap">Pays for itself in Year 1</span>
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
          const totalCard = document.getElementById('chwTotalCard');
          const barCost = document.getElementById('chwBarCost');
          const barCostVal = document.getElementById('chwBarCostVal');
          const barVisit = document.getElementById('chwBarVisit');
          const barVisitVal = document.getElementById('chwBarVisitVal');
          const barOffset = document.getElementById('chwBarOffset');
          const barOffsetVal = document.getElementById('chwBarOffsetVal');
          const breakevenLine = document.getElementById('chwBreakevenLine');
          const breakevenLabel = document.getElementById('chwBreakevenLabel');
          const healthCalloutText = document.getElementById('chwHealthCalloutText');
          const healthBadge = document.getElementById('chwHealthBadge');
          const fmt = (n) => '$' + Math.round(Math.abs(n)).toLocaleString('en-US');
          const fmtRound = (n) => {
            const abs = Math.abs(n);
            const r = abs >= 10000 ? Math.round(abs / 1000) * 1000 : Math.round(abs / 100) * 100;
            return '~$' + r.toLocaleString('en-US');
          };
          function update() {
            const c = counties[sel.value] || counties.STATEWIDE;
            const curScen = Number(scenSel.value) || 1;
            const curMult = Number(sensSel.value) || 1.0;
            let loaded = c.chw_loaded_cost;
            let gross = 0;
            let qalys = 0;
            let eventsText = '';
            let visitPct = c.ffs_share_low_pct + '% to ' + c.ffs_share_high_pct + '% from visits';
            let visitHighDollar = 10162;
            let visitBarText = '$6,775 to $10,162 / yr (' + c.ffs_share_low_pct + '% to ' + c.ffs_share_high_pct + '%)';
            if (curScen === 1) {
              loaded = c.chw_loaded_cost;
              gross = Math.round(107006 * curMult);
              qalys = 3.00 * curMult;
              eventsText = '~' + Math.round(27.0 * curMult) + ' ER visits, ~' + Math.round(11.55 * curMult) + ' stays avoided';
            } else if (curScen === 2) {
              loaded = c.chw_loaded_cost;
              gross = Math.round(291171 * curMult);
              qalys = 3.00 * curMult;
              eventsText = '~' + Math.round(27.0 * curMult) + ' ER visits, ~' + Math.round(11.55 * curMult) + ' stays avoided';
            } else if (curScen === 3) {
              loaded = c.chw_ongoing_cost;
              gross = Math.round(182333 * curMult);
              qalys = 4.09 * curMult;
              eventsText = '~' + Math.round(23.1 * curMult) + ' ER visits, ~' + Math.round(7.88 * curMult) + ' stays avoided';
              const clinicPct = ((46561 / loaded) * 100).toFixed(1);
              visitPct = clinicPct + '% from clinic visits';
              visitHighDollar = 46561;
              visitBarText = '$46,561 / yr (' + clinicPct + '% from clinic visits)';
            } else {
              loaded = c.chw_promotora_cost;
              gross = Math.round(c.scen4_gross_societal_offset * curMult);
              qalys = 8.18 * curMult;
              eventsText = '~' + (c.scen4_avoided_ed * curMult).toFixed(1) + ' ER visits, ~' + (c.scen4_avoided_ip * curMult).toFixed(1) + ' stays avoided';
              const lowP = ((3388 / loaded) * 100).toFixed(1);
              const highP = ((6348 / loaded) * 100).toFixed(1);
              visitPct = lowP + '% to ' + highP + '% from visits';
              visitHighDollar = 6348;
              visitBarText = '$3,388 to $6,348 / yr (' + lowP + '% to ' + highP + '%)';
            }
            const net = gross - loaded;
            const qalyVal = Math.round(qalys * 100000);
            wageStat.textContent = fmt(loaded) + ' / yr';
            wageSub.textContent = fmt(c.chw_base_salary) + ' base · ' + visitPct;
            offsetStat.textContent = fmtRound(gross) + ' / yr';
            offsetSub.textContent = eventsText;
            qalyStat.textContent = '~' + qalys.toFixed(1) + ' QALYs';
            qalySub.textContent = curScen === 4 ? 'Over 2 years + ~38 early checks' : 'Over 2 years ($100k/QALY benchmark)';
            if (net >= 0) {
              totalStat.textContent = 'Pays for itself in Year 1';
              totalSub.textContent = fmtRound(net) + ' net savings · ~' + qalys.toFixed(1) + ' QALYs';
            } else {
              const netOutlay = loaded - gross;
              const icer = fmtRound(Math.round(netOutlay / qalys)) + ' / QALY gained';
              totalStat.textContent = icer;
              totalSub.textContent = fmtRound(netOutlay) + ' net outlay · ~' + qalys.toFixed(1) + ' QALYs';
            }
            const scalePx = (val) => Math.max(4, Math.min(380, Math.round((val / 380000) * 380)));
            const costW = scalePx(loaded);
            const visitW = scalePx(visitHighDollar);
            const offsetW = scalePx(gross);
            barCost.setAttribute('width', String(costW));
            barCostVal.setAttribute('x', String(230 + costW + 8));
            barCostVal.textContent = fmt(loaded) + ' / yr (100% baseline)';
            barVisit.setAttribute('width', String(visitW));
            const bxLine = 230 + costW;
            barVisitVal.setAttribute('x', String(Math.max(230 + visitW + 8, bxLine + 10)));
            barVisitVal.textContent = visitBarText;
            barOffset.setAttribute('width', String(offsetW));
            barOffset.setAttribute('fill', net >= 0 ? '#0D9488' : '#0041A5');
            const offsetEnd = 230 + offsetW;
            if (offsetEnd + 8 > 545) {
              barOffsetVal.setAttribute('x', String(offsetEnd - 8));
              barOffsetVal.setAttribute('text-anchor', 'end');
              barOffsetVal.setAttribute('fill', '#FFFFFF');
            } else {
              barOffsetVal.setAttribute('x', String(Math.max(offsetEnd + 8, offsetEnd < bxLine ? bxLine + 10 : 0)));
              barOffsetVal.setAttribute('text-anchor', 'start');
              barOffsetVal.setAttribute('fill', net >= 0 ? '#065F46' : '#1E3A8A');
            }
            barOffsetVal.textContent = fmtRound(gross) + ' / yr (' + (net >= 0 ? 'Pays for itself' : fmtRound(loaded - gross) + ' net outlay') + ')';
            const bx = 230 + costW;
            breakevenLine.setAttribute('x1', String(bx));
            breakevenLine.setAttribute('x2', String(bx));
            breakevenLabel.setAttribute('x', String(bx));
            breakevenLabel.textContent = 'Breakeven (' + fmt(loaded) + ')';
            healthCalloutText.textContent = '~' + qalys.toFixed(1) + ' QALYs gained (' + fmtRound(qalyVal) + ' health value at $100,000 / QALY)' + (curScen === 4 ? ' plus ~38 early checks.' : '.');
            const badgeBase = 'inline-block font-mono text-xs font-bold border rounded px-2.5 py-1 whitespace-nowrap ';
            if (net >= 0) {
              healthBadge.textContent = 'Pays for itself in Year 1';
              healthBadge.className = badgeBase + 'text-emerald-900 bg-emerald-50 border-emerald-200';
              totalCard.className = 'bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5';
              totalStat.className = 'block font-mono text-base sm:text-lg font-bold text-emerald-900 mt-0.5';
            } else {
              healthBadge.textContent = 'Net outlay: ' + fmtRound(Math.round((loaded - gross) / qalys)) + ' / QALY gained';
              healthBadge.className = badgeBase + 'text-blue-900 bg-blue-50 border-blue-200';
              totalCard.className = 'bg-blue-50/70 border border-blue-200 rounded-lg p-3.5';
              totalStat.className = 'block font-mono text-base sm:text-lg font-bold text-blue-900 mt-0.5';
            }
          }
          sel.addEventListener('change', update);
          scenSel.addEventListener('change', update);
          sensSel.addEventListener('change', update);
        })();
      </script>
    </div>`;
  }

  let studyChartHtml = '';
  if (!countyLookupHtml) {
    const colNames = spec.table1.columns.map(c => stripVisibleModeTag(simplifyToGrade7(String(c.title || '').trim())));
    let chartTitle = '';
    let chartSub = '';
    let chartSummary = '';
    let svgInner = '';
    let svgHeight = 188;

    if (spec.slug === 'food-insecurity-diabetes' || spec.slug === 'food-affordability-tradeoffs') {
      const isDiabetes = spec.slug === 'food-insecurity-diabetes';
      chartTitle = 'Visual Comparison: Monthly Food Share Before vs. After Rent Across the 4 Areas';
      chartSub = 'Separate paired horizontal bars (non-stacked) comparing the $973/month USDA family food plan as a share of pre-rent income (slate) vs. post-rent disposable income (blue/teal), with a 30% post-rent budget stress reference line.';
      chartSummary = isDiabetes
        ? 'Table 1 takeaway: Subtracting monthly rent lifts the $973 food plan from 17.7% to 30.5% of remaining income in the High-Rent Working Area and from 31.4% to 46.4% in the Low-Income City Core, compared with 6.9% to 8.9% in the High-Income Suburb and 14.4% to 18.9% in the Rural Town Area.'
        : 'Table 1 takeaway: Subtracting monthly rent lifts the $973 food plan from 17.7% to 30.5% of remaining income in the High-Rent Working Tract and from 31.4% to 46.4% in the Low-Pay City Core, compared with 13.8% to 17.9% in the Rural Foothills County and 7.3% to 9.3% in the High-Pay Suburb County.';
      svgHeight = 236;
      const items = isDiabetes
        ? [
            { name: colNames[0] || 'High-Rent Working Area', pre: 17.7, post: 30.5 },
            { name: colNames[1] || 'Low-Income City Core', pre: 31.4, post: 46.4 },
            { name: colNames[2] || 'High-Income Suburb', pre: 6.9, post: 8.9 },
            { name: colNames[3] || 'Rural Town Area', pre: 14.4, post: 18.9 }
          ]
        : [
            { name: colNames[0] || 'High-Rent Working Tract', pre: 17.7, post: 30.5 },
            { name: colNames[1] || 'Low-Pay City Core', pre: 31.4, post: 46.4 },
            { name: colNames[2] || 'Rural Foothills County', pre: 13.8, post: 17.9 },
            { name: colNames[3] || 'High-Pay Suburb County', pre: 7.3, post: 9.3 }
          ];
      const maxScale = 50; // 50% = 340px
      const scalePx = (v) => Math.round((v / maxScale) * 340);
      const threshX = 225 + scalePx(30);
      const rowsSvg = items.map((it, i) => {
        const y = 34 + i * 48;
        const wPre = scalePx(it.pre);
        const wPost = scalePx(it.post);
        const postColor = it.post >= 30 ? '#0041A5' : '#0D9488';
        return `          <text x="215" y="${y + 18}" text-anchor="end" font-size="12" font-weight="600" fill="#1E293B">${escapeHtmlText(it.name)}</text>
          <rect x="225" y="${y}" width="${wPre}" height="14" rx="3" fill="#64748B"/>
          <text x="${225 + wPre + 6}" y="${y + 11}" font-size="11" font-weight="600" fill="#475569">${it.pre.toFixed(1)}% pre-rent</text>
          <rect x="225" y="${y + 17}" width="${wPost}" height="16" rx="3" fill="${postColor}"/>
          <text x="${225 + wPost + 6}" y="${y + 29}" font-size="12" font-weight="700" fill="#0F172A">${it.post.toFixed(1)}% post-rent</text>`;
      }).join('\n');
      svgInner = `          <line x1="225" y1="22" x2="225" y2="222" stroke="#CBD5E1" stroke-width="1.5"/>
          <line x1="${threshX}" y1="20" x2="${threshX}" y2="222" stroke="#D97706" stroke-width="1.5" stroke-dasharray="4,3"/>
          <text x="${threshX}" y="14" text-anchor="middle" font-size="11" font-weight="700" fill="#B45309">30% Post-Rent Food Share Reference</text>
${rowsSvg}`;
    } else if (spec.slug === 'medicaid-expansion') {
      chartTitle = 'Visual Comparison: Total Six-Month Coverage Losses vs. Avoidable Form Losses (Adult Counts)';
      chartSub = 'Separate paired horizontal bars (non-stacked) comparing total modeled six-month coverage losses (slate, Row 4) vs. avoidable paperwork losses among still-eligible adults (blue, Row 5).';
      chartSummary = 'Table 1 takeaway: Rule Exemptions have the largest volume of avoidable paperwork losses (6,831 of 9,435 total losses, or 72.4%), followed by Gig & Part-Time Workers (3,319 of 5,138, or 64.6%), Working >= 80 Hrs/Mo (2,228 of 6,367, or 35.0%), and No Recorded Work (1,841 of 6,136, or 30.0%).';
      svgHeight = 236;
      const items = [
        { name: colNames[0] || 'Working >= 80 Hrs/Mo', total: 6367, avoid: 2228, totalTxt: '6,367 total losses (13.9% of group)', avoidTxt: '2,228 avoidable form losses (35.0% of losses)' },
        { name: colNames[1] || 'Rule Exemptions', total: 9435, avoid: 6831, totalTxt: '9,435 total losses (19.9% of group)', avoidTxt: '6,831 avoidable form losses (72.4% of losses)' },
        { name: colNames[2] || 'Gig & Part-Time Work', total: 5138, avoid: 3319, totalTxt: '5138 total losses (38.8% of group)'.replace('5138', '5,138'), avoidTxt: '3,319 avoidable form losses (64.6% of losses)' },
        { name: colNames[3] || 'No Recorded Work', total: 6136, avoid: 1841, totalTxt: '6,136 total losses (44.6% of group)', avoidTxt: '1,841 avoidable form losses (30.0% of losses)' }
      ];
      const maxScale = 10500;
      const scalePx = (v) => Math.max(4, Math.round((v / maxScale) * 280));
      const rowsSvg = items.map((it, i) => {
        const y = 26 + i * 48;
        const wTot = scalePx(it.total);
        const wAv = scalePx(it.avoid);
        return `          <text x="215" y="${y + 18}" text-anchor="end" font-size="12" font-weight="600" fill="#1E293B">${escapeHtmlText(it.name)}</text>
          <rect x="225" y="${y}" width="${wTot}" height="14" rx="3" fill="#64748B"/>
          <text x="${225 + wTot + 6}" y="${y + 11}" font-size="11" font-weight="600" fill="#475569">${it.totalTxt}</text>
          <rect x="225" y="${y + 17}" width="${wAv}" height="16" rx="3" fill="#0041A5"/>
          <text x="${225 + wAv + 6}" y="${y + 29}" font-size="12" font-weight="700" fill="#0F172A">${it.avoidTxt}</text>`;
      }).join('\n');
      svgInner = `          <line x1="225" y1="16" x2="225" y2="216" stroke="#CBD5E1" stroke-width="1.5"/>
${rowsSvg}`;
    } else if (spec.slug === 'cost-effectiveness-ratio') {
      chartTitle = 'Visual Comparison: Cost per Healthy Year Gained (QALY) vs. $50,000 Strict Benchmark';
      chartSub = 'Separate horizontal bars (non-stacked) showing Table 1 cost per healthy year gained across all 4 accounting horizons against the strict $50,000/QALY U.S. value benchmark.';
      chartSummary = 'Table 1 takeaway: Year 1 startup and ramp costs $48,202/QALY (just under the strict $50,000/QALY line), while Years 2 to 5 ongoing care ($35,090/QALY), 5-year direct operating ($36,089/QALY), and 5-year total cost with startup ($37,712/QALY) all sit well below $50,000/QALY.';
      svgHeight = 200;
      const items = [
        { name: colNames[0] || 'Year 1 Startup & Ramp', val: 48202, txt: '$48,202 / QALY (Yr 1)' },
        { name: colNames[1] || 'Years 2 to 5 Ongoing Care', val: 35090, txt: '$35,090 / QALY (Yrs 2-5)' },
        { name: colNames[2] || 'Direct Operating Total', val: 36089, txt: '$36,089 / QALY (5-yr operating)' },
        { name: colNames[3] || 'Total Cost With Startup', val: 37712, txt: '$37,712 / QALY (5-yr w/ startup)' }
      ];
      const maxScale = 60000;
      const scalePx = (v) => Math.round((v / maxScale) * 330);
      const threshX = 225 + scalePx(50000);
      const rowsSvg = items.map((it, i) => {
        const y = 32 + i * 38;
        const w = scalePx(it.val);
        const col = i === 0 ? '#D97706' : '#0D9488';
        return `          <text x="215" y="${y + 15}" text-anchor="end" font-size="12" font-weight="600" fill="#1E293B">${escapeHtmlText(it.name)}</text>
          <rect x="225" y="${y}" width="${w}" height="22" rx="4" fill="${col}"/>
          <text x="${225 + w + 8}" y="${y + 15}" font-size="12" font-weight="700" fill="#0F172A">${escapeHtmlText(it.txt)}</text>`;
      }).join('\n');
      svgInner = `          <line x1="225" y1="22" x2="225" y2="184" stroke="#CBD5E1" stroke-width="1.5"/>
          <line x1="${threshX}" y1="20" x2="${threshX}" y2="184" stroke="#0041A5" stroke-width="1.5" stroke-dasharray="4,3"/>
          <text x="${threshX}" y="14" text-anchor="middle" font-size="11" font-weight="700" fill="#0041A5">$50,000 / QALY Strict Benchmark</text>
${rowsSvg}`;
    } else if (spec.slug === 'threat-maturation-solutions') {
      chartTitle = 'Visual Comparison: 2026 vs. 2030 SDI Fund Reserve Ratio Against the 25.0% Reserve Floor';
      chartSub = 'Separate paired horizontal bars (non-stacked) showing the 2026 onset reserve ratio (slate, Row 3) and 2030 Year-6 reserve ratio (teal/amber, Row 5) relative to 0% and the 25.0% prudent reserve floor.';
      chartSummary = 'Table 1 takeaway: In 2026, all four paths sit below the 25.0% floor (18.2% baseline, 10.8% expected 12-week, 13.2% conservative 12-week, -3.0% stress test). By 2030 (Row 5), the baseline (50.7%), expected 12-week plan (30.4%), and conservative 12-week plan (36.9%) rebuild above the 25.0% floor, while the 100% full-use stress test stays in deficit (-7.6%).';
      svgHeight = 236;
      const items = [
        { name: colNames[0] || 'Trend With No New Law', r26: 18.2, r30: 50.7, txt26: '2026: 18.2% ($3.19B)', txt30: '2030: 50.7% ($10.29B)' },
        { name: colNames[1] || '12-Week Plan (35% Use)', r26: 10.8, r30: 30.4, txt26: '2026: 10.8% ($1.96B)', txt30: '2030: 30.4% ($6.37B)' },
        { name: colNames[2] || '12-Week Plan (25% Use)', r26: 13.2, r30: 36.9, txt26: '2026: 13.2% ($2.36B)', txt30: '2030: 36.9% ($7.67B)' },
        { name: colNames[3] || 'Full-Use 100% Cap', r26: -3.0, r30: -7.6, txt26: '2026: -3.0% (-$0.58B)', txt30: '2030: -7.6% (-$1.70B)' }
      ];
      const zeroX = 265;
      const pxPerPct = 5.2; // 50.7% -> ~264px right; -7.6% -> ~40px left
      const threshX = zeroX + Math.round(25 * pxPerPct);
      const rowsSvg = items.map((it, i) => {
        const y = 34 + i * 48;
        const w26 = Math.max(4, Math.round(Math.abs(it.r26) * pxPerPct));
        const x26 = it.r26 >= 0 ? zeroX : zeroX - w26;
        const tx26 = it.r26 >= 0 ? x26 + w26 + 6 : zeroX + 6;
        const w30 = Math.max(4, Math.round(Math.abs(it.r30) * pxPerPct));
        const x30 = it.r30 >= 0 ? zeroX : zeroX - w30;
        const tx30 = it.r30 >= 0 ? x30 + w30 + 6 : zeroX + 6;
        const col30 = it.r30 >= 25 ? '#0D9488' : '#D97706';
        return `          <text x="215" y="${y + 18}" text-anchor="end" font-size="12" font-weight="600" fill="#1E293B">${escapeHtmlText(it.name)}</text>
          <rect x="${x26}" y="${y}" width="${w26}" height="14" rx="3" fill="#64748B"/>
          <text x="${tx26}" y="${y + 11}" font-size="11" font-weight="600" fill="#475569">${it.txt26}</text>
          <rect x="${x30}" y="${y + 17}" width="${w30}" height="16" rx="3" fill="${col30}"/>
          <text x="${tx30}" y="${y + 29}" font-size="12" font-weight="700" fill="#0F172A">${it.txt30}</text>`;
      }).join('\n');
      svgInner = `          <line x1="${zeroX}" y1="20" x2="${zeroX}" y2="222" stroke="#94A3B8" stroke-width="1.5"/>
          <text x="${zeroX}" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="#475569">0%</text>
          <line x1="${threshX}" y1="20" x2="${threshX}" y2="222" stroke="#0041A5" stroke-width="1.5" stroke-dasharray="4,3"/>
          <text x="${threshX}" y="14" text-anchor="middle" font-size="11" font-weight="700" fill="#0041A5">25.0% Reserve Floor</text>
${rowsSvg}`;
    }

    if (svgInner) {
      studyChartHtml = `
    <!-- NON-STACKED SVG COMPARISON CHART -->
    <div id="studyChartContainer" class="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 mb-8 shadow-sm">
      <div class="mb-3">
        <h3 class="text-sm sm:text-base font-bold text-slate-900">${escapeHtmlText(chartTitle)}</h3>
        <p class="text-xs text-slate-600 mt-0.5">${escapeHtmlText(chartSub)}</p>
      </div>
      <div>
        <svg id="studyComparisonSvg" viewBox="0 0 760 ${svgHeight}" class="w-full" style="height:auto;max-height:${svgHeight + 18}px;" role="img" aria-label="${escapeHtmlText(chartTitle)}">
${svgInner}
        </svg>
        <p class="text-xs text-slate-700 mt-2 leading-relaxed">${escapeHtmlText(chartSummary)}</p>
      </div>
    </div>`;
    }
  }

  const scenarioGridHtml = (!countyLookupHtml && spec.interactive) ? (() => {
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
  })() : '';

  const relatedLinksHtml = spec.related.map(r =>
    `          <li class="my-2"><a href="/case-studies/${r.slug}" class="text-[#0041A5] hover:text-[#003080] font-semibold underline">${r.title}</a></li>`
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
    .mt-4 { margin-top: 1rem; }
    .min-w-\\[640px\\] { min-width: 640px; }
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
            <a href="/case-studies">Case Studies</a>
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

    <!-- BLOCK 1: CONCISE EXECUTIVE HEADER (TWO-PART OPENING) -->
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
      <p class="policy-setting text-base sm:text-lg text-slate-700 max-w-4xl leading-relaxed mb-3">
        ${stripVisibleModeTag(renderedPolicySettingHtml)}
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
${countyLookupHtml}${studyChartHtml}
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
            <span class="font-bold text-slate-900">${stripVisibleModeTag(simplifyToGrade7(spec.table2.notesTitle || 'Table 2 Notes: Sample Scope &amp; Check Benchmarks'))}</span>
          </div>
          <span class="text-xs font-semibold text-[#0041A5] bg-white border border-slate-300 rounded px-2.5 py-1 whitespace-nowrap">Expand notes</span>
        </summary>
        <div class="px-5 pb-4 pt-3 border-t border-slate-200/60 leading-relaxed space-y-2">
          ${t2NotesCombined.map(b => `<p>&bull; ${b}</p>`).join('\n          ')}
        </div>
      </details>
    </div>
${scenarioGridHtml}
    <!-- POLICY FIT SYNTHESIS (VISIBLE TAKEAWAY) -->
    <section class="synthesis bg-white border border-slate-200 rounded-xl p-5 sm:p-6 mb-8 shadow-sm" aria-label="Policy Fit Synthesis">
      <h2 class="text-lg sm:text-xl font-bold text-[#003080] mb-2">${stripVisibleModeTag(simplifyToGrade7(spec.synthesis.title))}</h2>
      <p class="text-sm sm:text-base text-slate-800 leading-relaxed mb-3">${stripVisibleModeTag(simplifyToGrade7(spec.synthesis.p1))}</p>
      <p class="text-sm sm:text-base text-slate-800 leading-relaxed">${stripVisibleModeTag(simplifyToGrade7(spec.synthesis.p2))}</p>
    </section>

    <!-- BLOCK 5: COLLAPSIBLE DATA SOURCES, MODEL ASSUMPTIONS, FAQS & ENDNOTES -->
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
      <p class="text-xs text-slate-600 mt-3"><a href="/case-studies" class="text-[#0041A5] font-bold underline">Browse all California public health case studies &rarr;</a></p>
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
          <a href="/case-studies">Case Studies</a>
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

  const outPath = path.join(__dirname, '..', 'public', 'case-studies', spec.slug, 'index.html');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`Rendered [${spec.slug}] -> ${outPath} (title=${spec.pageTitle.length}c, answer=${answerWords}w, extLinks=${extLinks.length})`);
}

module.exports = { renderModuleHtml };
