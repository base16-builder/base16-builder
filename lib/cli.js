#!/usr/bin/env node

import meow from 'meow';
import fs from 'fs-promise';
import path from 'path';
import {buildTheme} from './';

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
      h: 'help'
    }
  });

  const {template: templName, scheme: schemeName, shade} = cli.flags;

  if (!templName || !schemeName || !shade) {
    console.error('fatal: You did not supply valid arguments. Run \'base16-builder -h\' for guidance.');
    return;
  }

  const templPath = path.join(__dirname, `db/templates/${templName}/${shade}.nunjucks`);
  const schemePath = path.join(__dirname, `db/schemes/${schemeName}.yml`);

  let templ;
  try {
    templ = await fs.readFile(templPath, 'utf8');
  } catch (err) {
     console.error(`Could not find a template called ${templName} in the database.`);
    return;
  }

  let scheme;
  try {
    scheme = await fs.readFile(schemePath, 'utf8');
  } catch (err) {
    console.error(`Could not find a scheme called ${schemeName} in the database.`);
    return;
  }

  const theme = buildTheme(scheme, templ);

  console.log(theme);
})();
