/* eslint-disable max-len */

import test from 'ava';
import execute from 'execa';

const command = '../dist/cli.js';

test('No arguments should cause help to be output', async function (t) {
  const {stdout: actual} = await execute(command);

  t.ok(actual.match(/Usage/));
  t.ok(actual.match(/Options/));
  t.ok(actual.match(/Example/));
});

test('help arguments should cause help to be output', async function (t) {
  const {stdout: actual} = await execute(command, ['--help']);

  t.ok(actual.match(/Usage/));
  t.ok(actual.match(/Options/));
  t.ok(actual.match(/Example/));
});

test('with alias help arguments should cause help to be output', async function (t) {
  const {stdout: actual} = await execute(command, ['-h']);

  t.ok(actual.match(/Usage/));
  t.ok(actual.match(/Options/));
  t.ok(actual.match(/Example/));
});

test('Given valid arguments & dark brightness, correct output is emitted', async function (t) {
  const templName = 'rxvt-unicode';
  const schemeName = 'gooey';
  const brightness = 'dark';
  const commandArgs = ['--template', templName, '--scheme', schemeName, '--brightness', brightness];
  const {stdout: actual} = await execute(command, commandArgs);

  t.ok(actual.match(/URxvt\*background:\s{21}#101218/), 'Match not found');
});

test('Given valid arguments & light brightness, correct output is emitted', async function (t) {
  const templName = 'rxvt-unicode';
  const schemeName = 'gooey';
  const brightness = 'light';
  const commandArgs = ['--template', templName, '--scheme', schemeName, '--brightness', brightness];
  const {stdout: actual} = await execute(command, commandArgs);

  t.ok(actual.match(/URxvt\*background:\s{21}#ffffff/), 'Match not found');
});

test('Given non-existent template name, correct error is emitted', async function (t) {
  const templName = 'template-foo';
  const schemeName = 'gooey';
  const brightness = 'light';
  const commandArgs = ['--template', templName, '--scheme', schemeName, '--brightness', brightness];
  const {stderr: actual} = await execute(command, commandArgs);

  t.is(actual, `Could not find template ${templName}.`);
});

test('Given non-existent scheme name, correct error is emitted', async function (t) {
  const templName = 'rxvt-unicode';
  const schemeName = 'scheme-foo';
  const brightness = 'light';
  const commandArgs = ['--template', templName, '--scheme', schemeName, '--brightness', brightness];
  const {stderr: actual} = await execute(command, commandArgs);

  t.is(actual, `Could not find scheme ${schemeName}.`);
});

test('Given non-existent scheme name & non-existent template name, correct error is emitted', async function (t) {
  const templName = 'template-foo';
  const schemeName = 'scheme-foo';
  const brightness = 'light';
  const commandArgs = ['--template', templName, '--scheme', schemeName, '--brightness', brightness];
  const {stderr: actual} = await execute(command, commandArgs);

  t.is(actual, `Could not find template ${templName}.`);
});

test('Given invalid command arguments, correct error is emitted', async function (t) {
  const invalidCommandArguments = [
    ['--template', 'i3wm'],
    ['--scheme', 'gooey'],
    ['--brightness', 'dark']
  ];
  for (const commandArguments of invalidCommandArguments) {
    const {stderr: actual} = await execute(command, commandArguments);

    t.is(actual, 'fatal: You did not supply valid arguments. Run \'base16-builder -h\' for guidance.');
  }
});

test('Given valid template path, correct output is emitted', async function (t) {
  const templPath = '../db/templates/rxvt-unicode/dark.nunjucks';
  const schemeName = 'gooey';
  const commandArgs = ['--template', templPath, '--scheme', schemeName];
  const {stdout: actual} = await execute(command, commandArgs);

  t.ok(actual.match(/URxvt\*background:\s{21}#101218/), 'Match not found');
});

test('Given valid scheme path, correct output is emitted', async function (t) {
  const templName = 'rxvt-unicode';
  const schemePath = '../db/schemes/gooey.yml';
  const brightness = 'dark';
  const commandArgs = ['--template', templName, '--scheme', schemePath, '--brightness', brightness];
  const {stdout: actual} = await execute(command, commandArgs);

  t.ok(actual.match(/URxvt\*background:\s{21}#101218/), 'Match not found');
});

test('Given valid template & scheme path, correct output is emitted', async function (t) {
  const templPath = '../db/templates/rxvt-unicode/dark.nunjucks';
  const schemePath = '../db/schemes/gooey.yml';
  const brightness = 'dark';
  const commandArgs = ['--template', templPath, '--scheme', schemePath, '--brightness', brightness];
  const {stdout: actual} = await execute(command, commandArgs);

  t.ok(actual.match(/URxvt\*background:\s{21}#101218/), 'Match not found');
});

test('Given valid arguments & dark brightness, correct output is emitted', async function (t) {
  const templName = 'rxvt-unicode';
  const schemeName = 'gooey';
  const brightness = 'dark';
  const commandArgs = ['-t', templName, '-s', schemeName, '-b', brightness];
  const {stdout: actual} = await execute(command, commandArgs);

  t.ok(actual.match(/URxvt\*background:\s{21}#101218/), 'Match not found');
});

test('Given invalid brightness argument, correct error is emitted ', async function (t) {
  const templName = 'rxvt-unicode';
  const schemeName = 'gooey';
  const brightness = 'foo';
  const commandArgs = ['-t', templName, '-s', schemeName, '-b', brightness];
  const {stderr: actual} = await execute(command, commandArgs);

  t.is(actual, 'fatal: You did not supply valid arguments. The value for brightness must be \'light\' or \'dark\'.');
});
