/* eslint-disable max-len */

import test from 'ava';
import execute from 'execa';
import fs from 'fs-promise';
import removeDir from 'rimraf-promise';
import countLines from 'line-count';

const command = '../dist/cli.js';

test.afterEach(async function() {
  await removeDir('output');
});

test('non-existent template should cause error', async function (t) {
  const commandArguments = ['-s', 'monokai', '-t', 'foo'];
  const {stderr: actual} = await execute(command, commandArguments);

  t.ok(/^Could not find a template called/.test(actual));
  t.ok(/goo.gl\/6c8djV$/.test(actual));
});

test('templates with special name should cause error', async function (t) {
  const templs = ['schemes', 'templates'];
  for (const templ of templs) {
    const commandArguments = ['-s', 'monokai', '-t', templ];
    const {stderr: actual} = await execute(command, commandArguments);

    t.ok(/^Could not find a template called/.test(actual));
    t.ok(/goo.gl\/6c8djV$/.test(actual));
  }
});

test('non-existent scheme should cause error', async function (t) {
  const commandArguments = ['-s', 'bar', '-t', 'i3wm'];
  const {stderr: actual} = await execute(command, commandArguments);

  t.ok(/^Could not find a scheme called/.test(actual));
  t.ok(/goo\.gl\/qMu3R5$/.test(actual));
});

test('schemes with special name should cause error', async function (t) {
  const schemes = ['schemes', 'templates'];
  for (const scheme of schemes) {
    const commandArguments = ['-s', scheme, '-t', 'i3wm'];
    const {stderr: actual} = await execute(command, commandArguments);

    t.ok(actual.match(/^Could not find a scheme called/));
    t.ok(/goo\.gl\/qMu3R5$/.test(actual));
  }
});

test('invalid command arguments should cause error', async function (t) {
  const invalidCommandArguments = [
    [],
    ['-t', 'i3wm'],
    ['-s', 'oceanicnext'],
    ['--template', 'i3wm'],
    ['--scheme', 'oceanicnext']
  ];
  for (const commandArguments of invalidCommandArguments) {
    const {stderr: actual} = await execute(command, commandArguments);

    t.ok(actual.match(/^fatal: You did not supply valid arguments\. See 'base16-builder -h' for help\/examples\./));
  }
});

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

test('valid arguments cause output file to be written', async function (t) {
  const scheme = 'oceanicnext';
  const templ = 'i3wm';
  const commandArguments = ['-s', scheme, '-t', templ];
  await execute(command, commandArguments);

  try {
    const path = `output/${templ}/${scheme}`;
    const actual = await fs.readFile(path, 'utf8');

    t.ok(/set \$base00 1B2B34/.test(actual));
  } catch (error) {
    t.fail(error);
  }
});

test('with aliases, valid arguments cause output file to be written', async function (t) {
  const scheme = 'oceanicnext';
  const templ = 'i3wm';
  const commandArguments = ['--scheme', scheme, '--template', templ];

  await execute(command, commandArguments);

  try {
    const path = `output/${templ}/${scheme}`;
    const actual = await fs.readFile(path, 'utf8');

    t.ok(/set \$base00 1B2B34/.test(actual));
  } catch (error) {
    t.fail(error);
  }
});

test('valid arguments cause success output message', async function (t) {
  const scheme = 'oceanicnext';
  const templ = 'i3wm';
  const commandArguments = ['-s', scheme, '-t', templ];

  const {stdout: actual} = await execute(command, commandArguments);

  const path = `output/${templ}/${scheme}`;
  const expected = `Successfully built theme. You can find the theme at ${path}`;
  t.is(actual, expected);
});

test('scheme list contains all schemes', async function (t) {
  const {stdout: output} = await execute(command, ['ls-schemes']);
  const actual = countLines(output);

  const expected = (await fs.readdir('../db/schemes')).length;
  t.is(actual, expected);
});

test('no schemes in scheme list end with ".yml"', async function (t) {
  const {stdout: actual} = await execute(command, ['ls-schemes']);

  t.false(/\.yml$/.test(actual));
});

test('scheme list is sorted alphabetically', async function (t) {
  const {stdout: actual} = await execute(command, ['ls-schemes']);

  const expected = actual.split('\n').sort().join('\n');

  t.is(actual, expected);
});
