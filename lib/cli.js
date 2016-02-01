#!/usr/bin/env node

import chalk from 'chalk';
import path from 'path';
import fs from 'fs-promise';
import meow from 'meow';
import {
  buildTheme
}
from './';


async function listFiles(dirPath) {
  try {
    const filePaths = await fs.readdir(dirPath);
    filePaths
      .map(filePath => filePath.split('.')[0])
      .sort()
      .forEach(fileName => console.log(fileName));
  } catch (error) {
    logError(error);
  }
}

function logError(errorMessage) {
  console.error(chalk.red(errorMessage));
}

function toRelativePath(bar) {
  return path.join(__dirname, bar);
}

(async function() {
  const cli = meow(`Usage:
  $ base16-builder <command>
  $ base16-builder [-s <scheme>] [-t <template>]

Commands:
  ls-schemes       List available schemes
  ls-templates     List available templates

Options:
  -s, --scheme     Build theme using this color scheme
  -t, --template   Build theme using this template

Examples:
  $ base16-builder ls-schemes
  $ base16-builder ls-templates
  $ base16-builder -s oceanicnext -t i3wm
  $ base16-builder --scheme oceanicnext --template i3wm`, {
    alias: {
      t: 'template',
      s: 'scheme',
      h: 'help'
    }
  });

  const argument = cli.input[0];
  switch (argument) {
    case 'ls-schemes':
      await listFiles(toRelativePath('db/schemes'));
      return;
    case 'ls-templates':
      await listFiles(toRelativePath('db/templates'));
      return;
    default:
  }

  const schemeName = cli.flags.s;
  const templName = cli.flags.t;

  if (!schemeName || !templName) {
    logError('fatal: You did not supply valid arguments. See \'base16-builder -h\' for help/examples.');
    return;
  }

  const templPath = toRelativePath(`db/templates/${templName}.nunjucks`);
  const schemePath = toRelativePath(`db/schemes/${schemeName}.yml`);

  try {
    const templ = await fs.readFile(templPath, 'utf8');
    const scheme = await fs.readFile(schemePath, 'utf8');
    const theme = buildTheme(scheme, templ);

    console.log(theme);
  } catch (e) {
    if (/\/schemes\//.test(e.path)) {
      logError(`fatal: Could not find a scheme called '${schemeName}'.
See \'base16-builder ls-schemes\' for a list of available schemes.`);
    } else if (/templates/.test(e.path)) {
      logError(`fatal: Could not find a template called '${templName}'.
See \'base16-builder ls-templates\' for a list of available templates.`);
    }
  }
}());
