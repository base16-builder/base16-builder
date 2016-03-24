/* eslint-disable max-len */

import test from 'ava'
import execute from 'execa'
import countLines from 'line-count'
import fs from 'fs-promise'

const command = '../dist/cli.js'

test('No arguments should cause help to be output', async function (t) {
  const {stdout: actual} = await execute(command)

  t.ok(actual.match(/Usage/))
  t.ok(actual.match(/Options/))
  t.ok(actual.match(/Commands/))
  t.ok(actual.match(/Example/))
})

test('help arguments should cause help to be output', async function (t) {
  const {stdout: actual} = await execute(command, ['--help'])

  t.ok(actual.match(/Usage/))
  t.ok(actual.match(/Options/))
  t.ok(actual.match(/Commands/))
  t.ok(actual.match(/Example/))
})

test('with alias help arguments should cause help to be output', async function (t) {
  const {stdout: actual} = await execute(command, ['-h'])

  t.ok(actual.match(/Usage/))
  t.ok(actual.match(/Options/))
  t.ok(actual.match(/Commands/))
  t.ok(actual.match(/Example/))
})

test('Given valid arguments & dark brightness, correct output is emitted', async function (t) {
  const templName = 'rxvt-unicode'
  const schemeName = 'gooey'
  const brightness = 'dark'
  const commandArgs = ['--template', templName, '--scheme', schemeName, '--brightness', brightness]
  const {stdout: actual} = await execute(command, commandArgs)

  t.ok(actual.match(/URxvt\*background:\s{21}#101218/), 'Match not found')
})

test('Given valid arguments & light brightness, correct output is emitted', async function (t) {
  const templName = 'rxvt-unicode'
  const schemeName = 'gooey'
  const brightness = 'light'
  const commandArgs = ['--template', templName, '--scheme', schemeName, '--brightness', brightness]
  const {stdout: actual} = await execute(command, commandArgs)

  t.ok(actual.match(/URxvt\*background:\s{21}#ffffff/), 'Match not found')
})

test('Given non-existent template name, correct error is emitted', async function (t) {
  const templName = 'template-foo'
  const schemeName = 'gooey'
  const brightness = 'light'
  const commandArgs = ['--template', templName, '--scheme', schemeName, '--brightness', brightness]
  const {stderr: actual} = await execute(command, commandArgs)

  t.is(actual, `Could not find template ${templName}.`)
})

test('Given non-existent scheme name, correct error is emitted', async function (t) {
  const templName = 'rxvt-unicode'
  const schemeName = 'scheme-foo'
  const brightness = 'light'
  const commandArgs = ['--template', templName, '--scheme', schemeName, '--brightness', brightness]
  const {stderr: actual} = await execute(command, commandArgs)

  t.is(actual, `Could not find scheme ${schemeName}.`)
})

test('Given non-existent scheme name & non-existent template name, correct error is emitted', async function (t) {
  const templName = 'template-foo'
  const schemeName = 'scheme-foo'
  const brightness = 'light'
  const commandArgs = ['--template', templName, '--scheme', schemeName, '--brightness', brightness]
  const {stderr: actual} = await execute(command, commandArgs)

  t.is(actual, `Could not find template ${templName}.`)
})

test('Given invalid command arguments, correct error is emitted', async function (t) {
  const invalidCommandArguments = [
    ['--template', 'rxvt-unicode'],
    ['--scheme', 'gooey'],
    ['--brightness', 'dark']
  ]
  for (const commandArguments of invalidCommandArguments) {
    const {stderr: actual} = await execute(command, commandArguments)

    t.is(actual, 'fatal: You did not supply valid arguments. Run \'base16-builder --help\' for guidance.')
  }
})

test('Given valid template path, correct output is emitted', async function (t) {
  const templPath = '../db/templates/rxvt-unicode/dark.ejs'
  const schemeName = 'gooey'
  const commandArgs = ['--template', templPath, '--scheme', schemeName]
  const {stdout: actual} = await execute(command, commandArgs)

  t.ok(actual.match(/URxvt\*background:\s{21}#101218/), 'Match not found')
})

test('Given valid scheme path, correct output is emitted', async function (t) {
  const templName = 'rxvt-unicode'
  const schemePath = '../db/schemes/gooey.yml'
  const brightness = 'dark'
  const commandArgs = ['--template', templName, '--scheme', schemePath, '--brightness', brightness]
  const {stdout: actual} = await execute(command, commandArgs)

  t.ok(actual.match(/URxvt\*background:\s{21}#101218/), 'Match not found')
})

test('Given valid template & scheme path, correct output is emitted', async function (t) {
  const templPath = '../db/templates/rxvt-unicode/dark.ejs'
  const schemePath = '../db/schemes/gooey.yml'
  const brightness = 'dark'
  const commandArgs = ['--template', templPath, '--scheme', schemePath, '--brightness', brightness]
  const {stdout: actual} = await execute(command, commandArgs)

  t.ok(actual.match(/URxvt\*background:\s{21}#101218/), 'Match not found')
})

test('Given valid arguments & dark brightness, correct output is emitted', async function (t) {
  const templName = 'rxvt-unicode'
  const schemeName = 'gooey'
  const brightness = 'dark'
  const commandArgs = ['-t', templName, '-s', schemeName, '-b', brightness]
  const {stdout: actual} = await execute(command, commandArgs)

  t.ok(actual.match(/URxvt\*background:\s{21}#101218/), 'Match not found')
})

test('Given invalid brightness argument, correct error is emitted ', async function (t) {
  const templName = 'rxvt-unicode'
  const schemeName = 'gooey'
  const brightness = 'foo'
  const commandArgs = ['-t', templName, '-s', schemeName, '-b', brightness]
  const {stderr: actual} = await execute(command, commandArgs)

  t.is(actual, 'fatal: You did not supply valid arguments. The value for brightness must be \'light\' or \'dark\'.')
})

test('Given valid arguments & dark brightness, author email is not encoded', async function (t) {
  const templName = 'rxvt-unicode'
  const schemeName = 'gooey'
  const brightness = 'dark'
  const commandArgs = ['--template', templName, '--scheme', schemeName, '--brightness', brightness]
  const {stdout: actual} = await execute(command, commandArgs)

  t.ok(actual.match(/<alexbooker@fastmail.im>/), 'Match not found')
  t.notOk(actual.match(/&lt;/), 'Match found')
  t.notOk(actual.match(/&gt;/), 'Match found')
})

test('Given valid arguments & brightness in uppercase, correct output is emitted', async function (t) {
  const templName = 'rxvt-unicode'
  const schemeName = 'gooey'
  const brightness = 'DARK'
  const commandArgs = ['--template', templName, '--scheme', schemeName, '--brightness', brightness]
  const {stdout: actual} = await execute(command, commandArgs)

  t.ok(actual.match(/URxvt\*background:\s{21}#101218/), 'Match not found')
})

test('Given valid arguments & scheme in uppercase, correct output is emitted', async function (t) {
  const templName = 'rxvt-unicode'
  const schemeName = 'GOOEY'
  const brightness = 'dark'
  const commandArgs = ['--template', templName, '--scheme', schemeName, '--brightness', brightness]
  const {stdout: actual} = await execute(command, commandArgs)

  t.ok(actual.match(/URxvt\*background:\s{21}#101218/), 'Match not found')
})

test('Given valid arguments & template in uppercase, correct output is emitted', async function (t) {
  const templName = 'RXVT-UNICODE'
  const schemeName = 'gooey'
  const brightness = 'dark'
  const commandArgs = ['--template', templName, '--scheme', schemeName, '--brightness', brightness]
  const {stdout: actual} = await execute(command, commandArgs)

  t.ok(actual.match(/URxvt\*background:\s{21}#101218/), 'Match not found')
})

// This test causes the browser to open and will not finish until the browser
// has been closed manually. This is way too much friction.
test.skip('Given ls schemes command, correct output is emitted', async function (t) {
  const commandArgs = ['ls', 'schemes']
  const {stdout: actual, stderr} = await execute(command, commandArgs)

  t.notOk(stderr)
  t.ok(actual.match(/Your browser window should have just loaded this/), 'Match not found')
})

test('Given ls templates command, all templtes are included in the list', async function (t) {
  const {stdout: output} = await execute(command, ['ls', 'templates'])
  const actual = countLines(output)

  const expected = (await fs.readdir('../db/templates')).length
  t.is(actual, expected)
})

test('Given ls templates command, no templates end with ".ejs"', async function (t) {
  const {stdout: actual} = await execute(command, ['ls', 'templates'])

  t.false(/\.ejs$/.test(actual))
})

test('Given ls templates command, template list is sorted alphabetically', async function (t) {
  const {stdout: actual} = await execute(command, ['ls', 'templates'])

  const expected = actual.split('\n').sort().join('\n')

  t.is(actual, expected)
})
