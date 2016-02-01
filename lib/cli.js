#!/usr/bin/env node

import chalk from 'chalk';
import path from 'path';
import fs from 'fs-promise';
import meow from 'meow';
import mkdirp from 'mkdirp-promise';
import {
  buildTheme
}
from './';

async function lsTemplates() {
  try {
    const templPaths = await fs.readdir(toRelativePath('db/templates'));
    templPaths
      .map(templPath => templPath.split('.')[0])
      .sort()
      .forEach(templName => console.log(templName));
  } catch (errorMessage) {
    writeErrorMessage(errorMessage);
  }
}

async function lsSchemes() {
  try {
    const schemePaths = await fs.readdir(toRelativePath('db/schemes'));
    schemePaths
      .map(schemePath => schemePath.split('.')[0])
      .sort()
      .forEach(schemeName => console.log(schemeName));
  } catch (errorMessage) {
    writeErrorMessage(errorMessage);
  }
}

function writeErrorMessage(errorMessage) {
  console.error(chalk.red(errorMessage));
}

function writeSuccessMessage(successMessage) {
  console.log(chalk.green(successMessage))
}

function toRelativePath(bar) {
  return path.join(__dirname, bar);
}

(async function() {
  const cli = meow(`Usage:
  $ base16-builder <command>
  $ base16-builder [-s <scheme>] [-t <template>]

Commands:
  ls-schemes List available schemes
  ls-templates List available templates

Options:
  -s, --scheme Build theme using this color scheme
  -t, --template Build theme using this template

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
  if (argument === 'ls-schemes') {
    await lsSchemes();
    return;
  } else if (argument === 'ls-templates') {
    await lsTemplates()();
    return;
  }

  const schemeName = cli.flags.s;
  const templName = cli.flags.t;

  if (!schemeName || !templName) {
    writeErrorMessage('fatal: You did not supply valid arguments. See \'base16-builder -h\' for help/examples.');
    return;
  }

  const templPath = toRelativePath(`db/templates/${templName}.nunjucks`);
  const schemePath = toRelativePath(`db/schemes/${schemeName}.yml`);

  try {
    const templ = await fs.readFile(templPath, 'utf8');
    const scheme = await fs.readFile(schemePath, 'utf8');
    const theme = buildTheme(scheme, templ);

    const outDirPath = `output/${templName}`;
    await mkdirp(outDirPath);

    const outPath = path.join(outDirPath, schemeName);
    await fs.writeFile(outPath, theme);

    writeSuccessMessage(`Successfully built theme. You can find the theme at ${outPath}`);
  } catch (e) {
    if (/\/schemes\//.test(e.path)) {
      writeErrorMessage(`Could not find a scheme called \"${schemeName}\". It is likely that no scheme with this
 name exists. For a complete list of schemes, see the database: https://goo.gl/qMu3R5`);
    } else if (/templates/.test(e.path)) {
      writeErrorMessage(`Could not find a template called \"${templName}\". It is likely that no template with this
name exists. For a complete list of templates, see the database: https://goo.gl/6c8djV`);
    }
  }
}());
