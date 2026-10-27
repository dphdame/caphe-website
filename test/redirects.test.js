'use strict';
const { test, before, after } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const { spawn } = require('node:child_process');
const path = require('node:path');

// Behavioral gate: boot the real server and assert the canonicalization redirects
// and robots policy actually behave (REG-2026-07-04 redirect class + GSC cleanup).
// Tests the running artifact, not source strings.

const PORT = 3987;
const BASE = `http://127.0.0.1:${PORT}`;
let srv;

function get(pathname) {
  return new Promise((resolve, reject) => {
    const req = http.get(`${BASE}${pathname}`, { headers: { Host: 'www.caphegroup.org' } }, (res) => {
      let body = '';
      res.on('data', c => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, location: res.headers.location, body }));
    });
    req.on('error', reject);
    req.setTimeout(5000, () => req.destroy(new Error('timeout')));
  });
}

before(async () => {
  srv = spawn('node', ['src/backend/server.js'], {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: String(PORT) },
    stdio: 'ignore',
  });
  // Poll until the server answers.
  for (let i = 0; i < 50; i++) {
    try { await get('/'); return; } catch { await new Promise(r => setTimeout(r, 100)); }
  }
  throw new Error('server did not start');
});

after(() => { if (srv) srv.kill('SIGKILL'); });

test('canonical clean URLs serve 200', async () => {
  for (const p of ['/', '/about', '/methods-lab', '/tools/lha-calculator']) {
    assert.equal((await get(p)).status, 200, `${p} should be 200`);
  }
});

test('/home 301-redirects to / (was a GSC 404)', async () => {
  const r = await get('/home');
  assert.equal(r.status, 301);
  assert.equal(r.location, '/');
});

test('.html and trailing-slash variants single-hop 301 to canonical', async () => {
  assert.deepEqual(await get('/about.html').then(r => [r.status, r.location]), [301, '/about']);
  assert.deepEqual(await get('/methods-lab/').then(r => [r.status, r.location]), [301, '/methods-lab']);
});

test('consolidated Methods Lab slugs single-hop 301 to canonical partner modules', async () => {
  const expected = {
    '/methods-lab/counterfactual-basics': '/methods-lab/before-after-trap',
    '/methods-lab/control-groups-not-enough': '/methods-lab/selection-into-treatment',
    '/methods-lab/threat-maturation-trends': '/methods-lab/before-after-trap',
    '/methods-lab/threat-history-events': '/methods-lab/before-after-trap',
    '/methods-lab/threat-history-maturation': '/methods-lab/before-after-trap',
    '/methods-lab/regression-tables-confounding': '/methods-lab/observational-to-experimental',
    '/methods-lab/confounding-assessment-checklist': '/methods-lab/reverse-causation-feedback',
    '/methods-lab/correlation-causation-interactive': '/methods-lab/collider-bias',
    '/methods-lab/threat-confounding-selection': '/methods-lab/collider-bias',
    '/methods-lab/why-it-works-isnt-enough': '/methods-lab/cost-effectiveness-ratio',
    '/methods-lab/comparator-choice': '/methods-lab/cost-effectiveness-ratio',
    '/methods-lab/decision-thresholds': '/methods-lab/cost-effectiveness-ratio',
    '/methods-lab/comparing-two-programs': '/methods-lab/chw-health-outcomes',
    '/methods-lab/cea-uncertain-effects': '/methods-lab/sensitivity-analysis-cea',
  };
  for (const [src, dest] of Object.entries(expected)) {
    assert.deepEqual(await get(src).then(r => [r.status, r.location]), [301, dest], src);
    assert.deepEqual(await get(`${src}/`).then(r => [r.status, r.location]), [301, dest], `${src}/`);
  }
});

test('robots.txt disallows /api/ for the default user-agent', async () => {
  const r = await get('/robots.txt');
  assert.equal(r.status, 200);
  // The "User-agent: *" group must contain Disallow: /api/
  const starGroup = r.body.split(/User-agent:/i)[1] || '';
  assert.match(starGroup, /Disallow:\s*\/api\//i, 'robots.txt * group must Disallow /api/');
});

