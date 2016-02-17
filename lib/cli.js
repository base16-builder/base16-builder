#!/usr/bin/env node

import meow from 'meow';
import fs from 'fs-promise';
import path from 'path';
import {buildTheme} from './';
import logger from './logger';

require('babel-polyfill');

(async function() {
  async function resolvePath(path) {
    let stat = await fs.lstat(path);
    if (stat.isFile()) {
      return path;
    }
  }

  const options = `Usage:
    $ base16-builder [-s <scheme>] [-t <template>] [-b <light|dark>]
    $ base16-builder [-s <scheme path>] [-t <template path>]

  Options:
    -s, --scheme     Build theme using this color scheme
    -t, --template   Build theme using this template
    -b, --brightness Build theme using this brightness

  Examples:
    $ base16-builder -s oceanicnext -t rxvt-unicode -b dark
    $ base16-builder --scheme oceanicnext --template rxvt-unicode --brightness dark
    $ base16-builder --scheme schemes/customScheme.yml --template templs/customTempl.nunjucks`;
  const cli = meow(options, {
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
    templPath = await resolvePath(templNameOrPath);
  } catch (error) {
  }

  if (!templPath) {
    if (!brightness) {
      logger.error('fatal: You did not supply valid arguments. Run \'base16-builder -h\' for guidance.');
      return;
    }

    if (brightness !== 'light' && brightness !== 'dark') {
      logger.error(
        'fatal: You did not supply valid arguments. The value for brightness must be \'light\' or \'dark\'.');
      return;
    }

    templPath = path.join(__dirname, `db/templates/${templNameOrPath}/${brightness}.nunjucks`);
  }

  let schemePath;
  try {
    schemePath = await resolvePath(schemeNameOrPath);
  } catch (error) {
  }

  if (!schemePath) {
    schemePath = path.join(__dirname, `db/schemes/${schemeNameOrPath}.yml`);
  }

  let templ;
  try {
    templ = await fs.readFile(templPath, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      logger.error(`Could not find template ${templNameOrPath}.`);
      return;
    }
    logger.error(`Unexpected error: ${JSON.stringify(err)}`);
    return;
  }

  let scheme;
  try {
    scheme = await fs.readFile(schemePath, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      logger.error(`Could not find scheme ${schemeNameOrPath}.`);
      return;
    }
    logger.error(`Unexpected error: ${JSON.stringify(err)}`);
  }

  const theme = buildTheme(scheme, templ);

  logger.log(theme);
})();
