import execa from 'execa';
import test from 'ava';
import fs from 'fs-promise';
import rimraf from 'rimraf-promise';

const cmd = '../dist/cli.js';

const invalidTemplNames = [
  'wobble-wibble',
  'schemes',
  'templates',
];
invalidTemplNames.forEach(function(invalidTemplName) {
  test('given a non-existent template, the program writes an accurate error to the console', async function(t) {
    const schemeName = 'oceanicnext';
    const templName = invalidTemplName
    const args = ['-s', schemeName, '-t', templName];

    const {
      stderr: actual
    } = await execa(cmd, args);

    t.ok(new RegExp(`Could not find a template called "${templName}"`).test(actual));
    t.ok(/https:\/\/goo.gl\/fhm4Ct/.test(actual));
  });
})

const invalidSchemeNames = [
  'wibble-wobble',
  'templates',
  'schemes'
];
invalidSchemeNames.forEach(function(invalidSchemeName) {
  test('given a non-existent scheme, the program writes an accurate error to the console ', async function(t) {
    const schemeName = invalidSchemeName;
    const templName = 'i3wm';
    const args = ['-s', schemeName, '-t', templName];

    const {
      stderr: actual
    } = await execa(cmd, args);

    t.ok(new RegExp(`Could not find a scheme called "${schemeName}"`).test(actual));
  });
});

test('given "help" arg program returns man page', async function(t) {
  const {
    stdout: output
  } = await execa(cmd, ['--help'])
  t.ok(output.match(/Usage/, 'expected man to contain "Usage"'));
  t.ok(output.match(/Options/, 'expected man to contain "Options"'));
  t.ok(output.match(/Example/, 'expected man to contain "Example"'));
});

test('given \"theme\" and \"scheme\" short names program writes output file', async function(t) {
  const schemeName = 'oceanicnext';
  const templName = 'i3wm';
  const args = ['-s', schemeName, '-t', templName];

  await execa(cmd, args);

  try {
    const actual =
      await fs.readFile(`output/${templName}/${schemeName}`, 'utf8');
    t.ok(/set \$base00 1B2B34/.test(actual));
  } catch (err) {
    t.fail(err);
  } finally {
    await rimraf('output');
  }
})


test('given \"theme\" and \"scheme\" long names program writes output file', async function(t) {
  const schemeName = 'oceanicnext';
  const templName = 'i3wm';
  const args = ['--scheme', schemeName, '--template', templName];

  await execa(cmd, args);

  try {
    const actual =
      await fs.readFile(`output/${templName}/${schemeName}`, 'utf8');
    t.ok(/set \$base00 1B2B34/.test(actual));
  } catch (err) {
    t.fail(err);
  } finally {
    await rimraf('output');
  }
})

const invalidArgs = [
  [],
  ['-t', 'i3wm'],
  ['-s', 'oceanicnext'],
  ['--template', 'i3wm'],
  ['--scheme', 'oceanicnext'],
];
invalidArgs.forEach(function(invalidArg) {
  test('given invalid argument program writes error to stderr', async function(t) {
    const {
      stderr
    } = await execa(cmd, invalidArg);

    t.ok(stderr, 'expected error to be written to stderr but stderr is "undefined".')
    t.ok(/^fatal: /.test(stderr, 'expected error to start wtih "fatal:"'));
    t.ok(/https:\/\/goo\.gl\/JwwX13/.test(stderr, "expected error to contain docs url"));
  })
})
