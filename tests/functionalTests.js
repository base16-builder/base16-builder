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
