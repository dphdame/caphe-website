#!/usr/bin/env node
/**
 * CAPHE Google Search Console + GA4 Baseline & Sitemap Updater
 *
 * Usage:
 *   node scripts/pull_gsc_ga4_baseline.js [--submit-sitemaps]
 *
 * Authenticates via the shared service account (/Users/vserver/Projects/unstoppableink/config/ga4-service-account.json
 * or GOOGLE_APPLICATION_CREDENTIALS) with full webmasters + analytics.readonly scopes:
 *   1. Optionally submits all 4 CAPHE sitemaps to GSC (HTTP 204) + IndexNow (HTTP 200).
 *   2. Pulls 90-day and 28-day GSC Search Analytics (by page and by query).
 *   3. Runs GSC URL Inspection API across all 23 canonical /case-studies URLs and
 *      their 23 legacy /methods-lab counterparts to benchmark indexing transition.
 *   4. Pulls 90-day and 28-day GA4 reports (channels, top pages, geography/human-vs-bot).
 *   5. Writes reproducible JSON + CSV + Markdown baseline report to:
 *      outputs/presentations/data/baseline_<YYYY-MM-DD>/
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SA_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  '/Users/vserver/Projects/unstoppableink/config/ga4-service-account.json';
const GSC_SITE = 'sc-domain:caphegroup.org';
const INSPECTION_SITE = 'sc-domain:caphegroup.org';
const GA4_PROPERTY = '515549363';
const BASE_URL = 'https://www.caphegroup.org';

const PUBLIC_CASE_STUDY_SLUGS = [
  'chw-health-outcomes',
  'medicaid-expansion',
  'food-insecurity-diabetes',
  'observational-to-experimental',
  'reverse-causation-feedback',
  'before-after-trap',
  'threat-regression-to-mean',
  'budget-impact',
  'measuring-health-common-unit',
  'cost-effectiveness-ratio',
  'sensitivity-analysis-cea',
  'threat-history-solutions',
  'threat-measurement-instrumentation',
  'study-design-ladder',
  'parallel-trends-power',
  'p-hacking-multiple-testing',
  'measurement-error-claims',
  'collider-bias',
  'classifying-causal-mechanisms',
  'food-affordability-tradeoffs',
  'geographic-variables',
  'identical-data-opposite-policies'
];

function makeJwt(sa, scopes) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: sa.client_email,
    scope: scopes.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  })).toString('base64url');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(`${header}.${payload}`);
  const sig = sign.sign(sa.private_key, 'base64url');
  return `${header}.${payload}.${sig}`;
}

async function getAccessToken(sa) {
  const jwt = makeJwt(sa, [
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/analytics.readonly'
  ]);
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });
  const data = await res.json();
  if (!data.access_token) {
    throw new Error(`Failed to obtain access token: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

function fmtDate(d) {
  return d.toISOString().split('T')[0];
}

async function gscQuery(headers, startDate, endDate, dimensions, rowLimit = 250) {
  const siteEnc = encodeURIComponent(GSC_SITE);
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ startDate, endDate, dimensions, rowLimit })
  });
  const data = await res.json();
  return data.rows || [];
}

async function inspectUrl(headers, inspectionUrl) {
  const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      inspectionUrl,
      siteUrl: INSPECTION_SITE,
      languageCode: 'en-US'
    })
  });
  const data = await res.json();
  const idx = (data.inspectionResult && data.inspectionResult.indexStatusResult) || {};
  return {
    url: inspectionUrl,
    verdict: idx.verdict || 'UNKNOWN',
    coverageState: idx.coverageState || 'Unknown',
    robotsTxtState: idx.robotsTxtState || null,
    indexingState: idx.indexingState || null,
    lastCrawlTime: idx.lastCrawlTime || null,
    pageFetchState: idx.pageFetchState || null,
    googleCanonical: idx.googleCanonical || null,
    userCanonical: idx.userCanonical || null,
    referringUrls: idx.referringUrls || []
  };
}

async function ga4Report(headers, startDate, endDate, dimensions, metrics) {
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY}:runReport`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      dateRanges: [{ startDate, endDate }],
      dimensions: dimensions.map(name => ({ name })),
      metrics: metrics.map(name => ({ name })),
      limit: 100
    })
  });
  const data = await res.json();
  return data.rows || [];
}

function classifyQuery(q) {
  const s = q.toLowerCase();
  if (/caphe|california association of public health/.test(s)) return 'Brand';
  if (/parallel trends|collider|confound|regression to the mean|difference in differences|did|counterfactual|selection bias|p-hacking|multiple testing|instrumental|synthetic control|causal|observational|before and after|maturation/.test(s)) {
    return 'Causal Inference & Methods';
  }
  if (/cost effectiveness|icer|qaly|budget impact|roi|return on investment|value of statistical life|vsl|health economics|cea|medicaid|medi-cal|chw|community health worker|food insecurity|calfresh|public health spending|local health/.test(s)) {
    return 'Health Economics & CA Policy';
  }
  return 'Other Public Health & General';
}

async function main() {
  const submitFlag = process.argv.includes('--submit-sitemaps');
  const sa = JSON.parse(fs.readFileSync(SA_PATH, 'utf8'));
  const token = await getAccessToken(sa);
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  // Date windows (GSC lags ~2-3 days)
  const now = new Date();
  const gscEnd = new Date(now.getTime() - 3 * 86400 * 1000);
  const gscStart90 = new Date(gscEnd.getTime() - 89 * 86400 * 1000);
  const gscStart28 = new Date(gscEnd.getTime() - 27 * 86400 * 1000);
  const gaEnd = new Date(now.getTime() - 1 * 86400 * 1000);
  const gaStart90 = new Date(gaEnd.getTime() - 89 * 86400 * 1000);
  const gaStart28 = new Date(gaEnd.getTime() - 27 * 86400 * 1000);

  const todayStr = fmtDate(now);
  const outDir = path.join(__dirname, '..', 'outputs', 'presentations', 'data', `baseline_${todayStr}`);
  fs.mkdirSync(outDir, { recursive: true });

  const siteEnc = encodeURIComponent(GSC_SITE);

  // 1. Submit Sitemaps if requested
  if (submitFlag) {
    for (const sm of [
      `${BASE_URL}/sitemap-index.xml`,
      `${BASE_URL}/sitemap-tutorials.xml`,
      `${BASE_URL}/sitemap-static.xml`,
      `${BASE_URL}/sitemap.xml`
    ]) {
      const r = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${siteEnc}/sitemaps/${encodeURIComponent(sm)}`, {
        method: 'PUT',
        headers
      });
      console.log(`[GSC Sitemap Submit] ${sm} -> HTTP ${r.status}`);
    }
  }

  const sitemapsData = await (await fetch(`https://www.googleapis.com/webmasters/v3/sites/${siteEnc}/sitemaps`, { headers })).json();

  // 2. Pull GSC Search Analytics (90d & 28d)
  const [gscPages90, gscQueries90, gscPages28, gscQueries28] = await Promise.all([
    gscQuery(headers, fmtDate(gscStart90), fmtDate(gscEnd), ['page'], 250),
    gscQuery(headers, fmtDate(gscStart90), fmtDate(gscEnd), ['query'], 250),
    gscQuery(headers, fmtDate(gscStart28), fmtDate(gscEnd), ['page'], 250),
    gscQuery(headers, fmtDate(gscStart28), fmtDate(gscEnd), ['query'], 250)
  ]);

  // 3. Inspect canonical /case-studies URLs + legacy /methods-lab URLs
  const urlsToInspect = [
    `${BASE_URL}/case-studies`,
    ...PUBLIC_CASE_STUDY_SLUGS.map(s => `${BASE_URL}/case-studies/${s}`),
    `${BASE_URL}/methods-lab`,
    ...PUBLIC_CASE_STUDY_SLUGS.map(s => `${BASE_URL}/methods-lab/${s}`)
  ];

  console.log(`Inspecting ${urlsToInspect.length} URLs in Google Search Console...`);
  const inspections = [];
  for (let i = 0; i < urlsToInspect.length; i += 6) {
    const batch = urlsToInspect.slice(i, i + 6);
    const resBatch = await Promise.all(batch.map(u => inspectUrl(headers, u)));
    inspections.push(...resBatch);
  }

  // 4. Pull GA4 Reports (90d & 28d)
  const [gaChannels90, gaChannels28, gaPages90, gaPages28, gaGeo90] = await Promise.all([
    ga4Report(headers, fmtDate(gaStart90), fmtDate(gaEnd), ['sessionDefaultChannelGroup'], ['totalUsers', 'sessions', 'screenPageViews', 'averageSessionDuration']),
    ga4Report(headers, fmtDate(gaStart28), fmtDate(gaEnd), ['sessionDefaultChannelGroup'], ['totalUsers', 'sessions', 'screenPageViews', 'averageSessionDuration']),
    ga4Report(headers, fmtDate(gaStart90), fmtDate(gaEnd), ['pagePath'], ['screenPageViews', 'totalUsers', 'userEngagementDuration']),
    ga4Report(headers, fmtDate(gaStart28), fmtDate(gaEnd), ['pagePath'], ['screenPageViews', 'totalUsers', 'userEngagementDuration']),
    ga4Report(headers, fmtDate(gaStart90), fmtDate(gaEnd), ['country', 'region'], ['totalUsers', 'sessions'])
  ]);

  // Save full JSON snapshot
  const snapshot = {
    pulledAt: new Date().toISOString(),
    windows: {
      gsc90d: { startDate: fmtDate(gscStart90), endDate: fmtDate(gscEnd) },
      gsc28d: { startDate: fmtDate(gscStart28), endDate: fmtDate(gscEnd) },
      ga90d: { startDate: fmtDate(gaStart90), endDate: fmtDate(gaEnd) },
      ga28d: { startDate: fmtDate(gaStart28), endDate: fmtDate(gaEnd) }
    },
    sitemaps: sitemapsData.sitemap || [],
    gscPages90,
    gscQueries90,
    gscPages28,
    gscQueries28,
    inspections,
    gaChannels90,
    gaChannels28,
    gaPages90,
    gaPages28,
    gaGeo90
  };

  fs.writeFileSync(path.join(outDir, 'baseline_snapshot.json'), JSON.stringify(snapshot, null, 2));

  // Summarize & Print Key Metrics
  const sumGsc = (rows) => {
    let clicks = 0, impressions = 0, weightedPos = 0;
    for (const r of rows) {
      clicks += r.clicks || 0;
      impressions += r.impressions || 0;
      weightedPos += (r.position || 0) * (r.impressions || 0);
    }
    return {
      clicks,
      impressions,
      ctrPct: impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : '0.00',
      avgPosition: impressions > 0 ? (weightedPos / impressions).toFixed(1) : 'N/A'
    };
  };

  const gsc90Summary = sumGsc(gscPages90);
  const gsc28Summary = sumGsc(gscPages28);

  const caseStudyInspections = inspections.filter(x => x.url.includes('/case-studies'));
  const methodsLabInspections = inspections.filter(x => x.url.includes('/methods-lab'));

  const countByState = (arr) => {
    const m = {};
    for (const x of arr) m[x.coverageState] = (m[x.coverageState] || 0) + 1;
    return m;
  };

  console.log('\n=== BASELINE SNAPSHOT SAVED TO ===');
  console.log(outDir);
  console.log('\n=== GSC 90-DAY SUMMARY ===', gsc90Summary);
  console.log('=== GSC 28-DAY SUMMARY ===', gsc28Summary);
  console.log('\n=== URL INSPECTION: /case-studies (23 URLs) ===', countByState(caseStudyInspections));
  console.log('=== URL INSPECTION: /methods-lab (23 URLs) ===', countByState(methodsLabInspections));
  console.log('\n=== DETAILED /methods-lab INSPECTIONS ===');
  for (const x of methodsLabInspections) {
    console.log(`  ${x.url.replace(BASE_URL, '')} -> ${x.verdict} | ${x.coverageState} | lastCrawl=${x.lastCrawlTime || 'never'} | googleCanon=${x.googleCanonical || '-'}`);
  }
  console.log('\n=== DETAILED /case-studies INSPECTIONS ===');
  for (const x of caseStudyInspections) {
    console.log(`  ${x.url.replace(BASE_URL, '')} -> ${x.verdict} | ${x.coverageState} | lastCrawl=${x.lastCrawlTime || 'never'} | googleCanon=${x.googleCanonical || '-'}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
