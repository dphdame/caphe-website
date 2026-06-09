#!/usr/bin/env node
/**
 * Add structured data to CAPHE org / membership / resource pages (PRD §6.2, Clusters C & E).
 * Marker-guarded + idempotent. Facts are drawn from the pages themselves and from
 * data/events.json — no fabricated prices (professional membership lists no price,
 * so its Offer omits a price rather than inventing one).
 * Run: node scripts/apply-org-schema.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const BASE = 'https://www.caphegroup.org';

const ORG = {
  '@type': ['Organization', 'EducationalOrganization'],
  name: 'California Association of Public Health Economists',
  alternateName: 'CAPHE',
  url: BASE,
  email: 'research@caphegroup.org',
  foundingDate: '2024',
  areaServed: { '@type': 'AdministrativeArea', name: 'California' },
  logo: { '@type': 'ImageObject', url: `${BASE}/assets/images/logo.png` },
};

function breadcrumb(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem', position: i + 1, name: t.name, item: `${BASE}${t.path}`,
    })),
  };
}

function graph(nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

function pastEvents() {
  const events = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'events.json'), 'utf8')).events || [];
  const today = '2026-06-08';
  return events.filter(e => e.date < today).map(e => ({
    '@type': 'Event',
    name: e.title,
    startDate: e.date,
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    ...(e.description ? { description: e.description } : {}),
    organizer: { '@type': 'Organization', name: 'CAPHE', url: BASE },
    ...(e.recording_url ? { recordedIn: { '@type': 'VideoObject', name: e.title, uploadDate: e.date, url: e.recording_url } } : {}),
  }));
}

// page → schema nodes
const PAGES = {
  'membership.html': () => graph([
    ORG,
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'Membership', path: '/membership' }]),
  ]),
  'membership/community.html': () => graph([
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'Membership', path: '/membership' }, { name: 'Community', path: '/membership/community' }]),
    {
      '@type': 'Offer', name: 'CAPHE Community Membership', category: 'Community Membership',
      price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock',
      eligibleRegion: { '@type': 'AdministrativeArea', name: 'California' },
      offeredBy: ORG,
    },
  ]),
  'membership/professional.html': () => graph([
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'Membership', path: '/membership' }, { name: 'Professional', path: '/membership/professional' }]),
    {
      '@type': 'Offer', name: 'CAPHE Professional Membership', category: 'Professional Membership',
      priceCurrency: 'USD', availability: 'https://schema.org/InStock',
      eligibleRegion: { '@type': 'AdministrativeArea', name: 'California' },
      offeredBy: ORG,
    },
  ]),
  'programs.html': () => graph([
    ORG,
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'Programs', path: '/programs' }]),
  ]),
  'peer-review.html': () => graph([
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'Peer Review', path: '/peer-review' }]),
    { '@type': 'Service', name: 'CAPHE Peer Review Sessions', serviceType: 'Academic peer review', provider: ORG, areaServed: { '@type': 'AdministrativeArea', name: 'California' } },
  ]),
  'contact.html': () => graph([
    { ...ORG, contactPoint: { '@type': 'ContactPoint', email: 'research@caphegroup.org', contactType: 'general inquiries' } },
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]),
  ]),
  'resources.html': () => graph([
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources' }]),
    {
      '@type': 'CollectionPage', name: 'Learn & Research', url: `${BASE}/resources`,
      isPartOf: { '@type': 'WebSite', name: 'CAPHE', url: BASE },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Methods Lab', url: `${BASE}/methods-lab/` },
          { '@type': 'ListItem', position: 2, name: 'ROI Calculator', url: `${BASE}/tools/lha-calculator` },
          { '@type': 'ListItem', position: 3, name: 'Access Explorer', url: `${BASE}/tools/access-explorer` },
          { '@type': 'ListItem', position: 4, name: 'Health Economics Data Sources', url: `${BASE}/resources/health-economics-data-sources` },
        ],
      },
    },
  ]),
  'past-events.html': () => graph([
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'Past Events', path: '/past-events' }]),
    { '@type': 'ItemList', name: 'CAPHE Past Events', itemListElement: pastEvents().map((ev, i) => ({ '@type': 'ListItem', position: i + 1, item: ev })) },
  ]),
};

function inject(file, obj) {
  const full = path.join(PUBLIC, file);
  let html = fs.readFileSync(full, 'utf8');
  const block = `<!-- schema:org:start -->\n<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n</script>\n<!-- schema:org:end -->`;
  const re = /<!-- schema:org:start -->[\s\S]*?<!-- schema:org:end -->/;
  if (re.test(html)) html = html.replace(re, block);
  else {
    const at = html.search(/<\/head>/i);
    html = html.slice(0, at) + block + '\n' + html.slice(at);
  }
  fs.writeFileSync(full, html);
  console.log(`  OK ${file}`);
}

for (const [file, fn] of Object.entries(PAGES)) inject(file, fn());
console.log(`Injected org schema into ${Object.keys(PAGES).length} pages.`);
