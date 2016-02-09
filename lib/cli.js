#!/usr/bin/env node

import meow from 'meow';
import fs from 'fs-promise';
import path from 'path';
import {buildTheme} from './';
import logger from './logger';

(async function() {
  const optionsText = `Usage:
    $ base16-builder <command>
    $ base16-builder [-s <scheme>] [-t <template>]
    $ base16-builder [-s <scheme path>] [-t <template path>]

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
    $ base16-builder --scheme oceanicnext --template i3wm
    $ base16-builder --scheme schemes/customScheme.yml --template templs/customTempl.nunjucks`;

  const cli = meow(optionsText, {
    alias: {
      h: 'help',
      t: 'template',
      s: 'scheme',
      b: 'brightness'
    }
  });

  const {template: templNameOrPath, scheme: schemeNameOrPath, brightness} = cli.flags;

  if (!templNameOrPath || !schemeNameOrPath) {
    logger.error('fatal: You did not supply valid arguments. Run \'base16-builder -h\' for guidance.');
    return;
  }

  let templPath;
  try {
    const templStat = await fs.lstat(templNameOrPath);
    if (templStat.isFile()) {
      templPath = templNameOrPath;
    }
  } catch (error) {
  }

  if (!templPath) {
    if (!brightness) {
      logger.error('fatal: You did not supply valid arguments. Run \'base16-builder -h\' for guidance.');
      return;
    } templPath = path.join(__dirname, `db/templates/${templNameOrPath}/${brightness}.nunjucks`);
  }

  let schemePath;
  try {
    const schemeStat = await fs.lstat(schemeNameOrPath);
    if (schemeStat.isFile()) {
      schemePath = schemeNameOrPath;
    }
  } catch (error) {
  }
  if (!schemePath) {
    schemePath = path.join(__dirname, `db/schemes/${schemeNameOrPath}.yml`);
  }

  let templ;
  try {
    templ = await fs.readFile(templPath, 'utf8');
  } catch (err) {
    logger.error(`Could not find a template called ${templNameOrPath} in the database.`);
    return;
  }

  let scheme;
  try {
    scheme = await fs.readFile(schemePath, 'utf8');
  } catch (err) {
    logger.error(`Could not find a scheme called ${schemeNameOrPath} in the database.`);
    return;
  }

  const theme = buildTheme(scheme, templ);

  logger.log(theme);
})();
