// Regenerates src/data/parity.json from a FreeMix checkout.
// Usage: FREEMIX_DIR=../freemix npm run sync
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { parse } from 'smol-toml';

const root = resolve(process.env.FREEMIX_DIR ?? '../freemix');
const ledger = parse(readFileSync(join(root, 'parity.toml'), 'utf8'));
const markdown = readFileSync(join(root, 'docs/spec/feature-parity.md'), 'utf8');

// Capability and acceptance text live in the Markdown ledger tables.
const rows = new Map();
let area = '';
for (const line of markdown.split('\n')) {
  const heading = line.match(/^## \d+\. (.+)$/);
  if (heading) area = heading[1];
  const row = line.match(/^\| ([A-Z]{2}-\d{3}) \| (P\d) \| (.+?) \| (.+) \|$/);
  if (row) rows.set(row[1], { area, capability: row[3].trim(), acceptance: row[4].trim() });
}

const tests = new Map(ledger.tests.map((t) => [t.id, t.state]));
const features = ledger.features.map((f) => {
  const text = rows.get(f.id);
  if (!text) throw new Error(`${f.id} is in parity.toml but not in feature-parity.md`);
  const testStates = f.tests.map((id) => tests.get(id) ?? 'planned');
  return {
    id: f.id,
    priority: f.priority,
    phase: f.phase,
    owner: f.owner,
    status: f.status,
    exactIntegration: f.substitution_policy === 'exact-authorized-integration-required',
    testsPresent: testStates.includes('present'),
    dependencies: f.dependencies,
    ...text,
  };
});

const git = (...args) => execFileSync('git', ['-C', root, ...args], { encoding: 'utf8' }).trim();
const protocol = git('log', '-1', '--format=%s').match(/protocol (\d+\.\d+)/)?.[1] ?? null;
const tracked = git('ls-files').split('\n');
const rustLines = tracked
  .filter((f) => f.endsWith('.rs'))
  .reduce((n, f) => n + readFileSync(join(root, f), 'utf8').split('\n').length, 0);
const stats = {
  crates: tracked.filter((f) => /^crates\/[^/]+\/[^/]+\/Cargo\.toml$/.test(f)).length,
  apps: tracked.filter((f) => /^apps\/[^/]+\/Cargo\.toml$/.test(f)).length,
  rustLines,
};
const out = {
  generatedFrom: { commit: git('rev-parse', '--short', 'HEAD'), date: git('log', '-1', '--format=%cs'), protocol },
  stats,
  features,
};
writeFileSync(new URL('../src/data/parity.json', import.meta.url), JSON.stringify(out, null, 2) + '\n');
console.log(`Wrote ${features.length} ledger rows from ${out.generatedFrom.commit}.`);
