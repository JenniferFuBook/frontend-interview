#!/usr/bin/env node
/**
 * Runs the full verification suite: build, lint, test, and snippets.
 *
 *   npm run testAll                    verify the current branch
 *   npm run testAll -- --allBranches   verify every local branch in turn
 *
 * With --allBranches the working tree must be clean. The script checks out each
 * local branch, runs the suite, and returns to the branch it started on. It
 * exits non-zero if any checked branch fails.
 */
import { spawnSync } from 'node:child_process';

const steps = [
  ['build', ['run', 'build']],
  ['lint', ['run', 'lint']],
  ['test', ['test']],
  ['snippets', ['run', 'snippets']],
];

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function runSuite() {
  for (const [name, args] of steps) {
    console.log(`\n--- ${name} ---`);
    if (spawnSync(npm, args, { stdio: 'inherit' }).status !== 0) return false;
  }
  return true;
}

function git(args) {
  return spawnSync('git', args, { encoding: 'utf8' });
}

if (!process.argv.includes('--allBranches')) {
  process.exit(runSuite() ? 0 : 1);
}

// --allBranches: run the suite on every local branch.
if (git(['status', '--porcelain']).stdout.trim()) {
  console.error('Working tree is not clean; commit or stash before --allBranches.');
  process.exit(1);
}
const start = git(['rev-parse', '--abbrev-ref', 'HEAD']).stdout.trim();
const branches = git(['for-each-ref', '--format=%(refname:short)', 'refs/heads'])
  .stdout.split('\n')
  .map((s) => s.trim())
  .filter(Boolean);

const results = [];
for (const branch of branches) {
  console.log(`\n########## ${branch} ##########`);
  if (git(['checkout', branch]).status !== 0) {
    results.push([branch, 'checkout-failed']);
    continue;
  }
  results.push([branch, runSuite() ? 'pass' : 'FAIL']);
}
git(['checkout', start]);

console.log('\n===== summary =====');
for (const [branch, result] of results) {
  console.log(`  ${result === 'pass' ? '✓' : '✗'} ${branch}: ${result}`);
}
process.exit(results.every(([, r]) => r === 'pass') ? 0 : 1);
