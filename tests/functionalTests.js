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

test('Given valid arguments & dark shade, correct output is emitted', async function (t) {
  const templName = 'rxvt-unicode';
  const schemeName = 'gooey';
  const shade = 'dark';
  const commandArgs = ['--template', templName, '--scheme', schemeName, '--shade', shade];
  const {stdout: actual} = await execute(command, commandArgs);

  t.ok(actual.match(/URxvt\*background:\s{21}#101218/), 'Match not found');
});

test('Given valid arguments & light shade, correct output is emitted', async function (t) {
  const templName = 'rxvt-unicode';
  const schemeName = 'gooey';
  const shade = 'light';
  const commandArgs = ['--template', templName, '--scheme', schemeName, '--shade', shade];
  const {stdout: actual} = await execute(command, commandArgs);

  t.ok(actual.match(/URxvt\*background:\s{21}#ffffff/), 'Match not found');
});

