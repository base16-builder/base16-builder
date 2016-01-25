import execa from 'execa';
import test from 'ava';
import fs from 'fs-promise';
import rimraf from 'rimraf-promise';

const cmd = '../dist/cli.js';

test('given "help" arg program returns man page', async function(t) {
  const {
    stdout: output
  } = await execa(cmd, ['--help'])
  t.ok(output.match(/man/i));
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
