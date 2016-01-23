import execa from 'execa';
import test from 'ava';

test('given "help" arg program returns man page', async function (t) {
  const cmd = '../dist/cli.js';
  const { stdout: output } = await execa(cmd, ['--help'])
  t.ok(output.match(/man/i));
});
