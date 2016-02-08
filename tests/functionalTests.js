/* eslint-disable max-len */

import test from 'ava';
import execute from 'execa';

const command = '../dist/cli.js';

test('help arguments should cause help to be output', async function (t) {
  const {stdout: actual} = await execute(command, ['--help']);

  t.ok(actual.match(/Usage/));
  t.ok(actual.match(/Commands/));
  t.ok(actual.match(/Options/));
  t.ok(actual.match(/Example/));
});

test('with alias help arguments should cause help to be output', async function (t) {
  const {stdout: actual} = await execute(command, ['-h']);

  t.ok(actual.match(/Usage/));
  t.ok(actual.match(/Commands/));
  t.ok(actual.match(/Options/));
  t.ok(actual.match(/Example/));
});

