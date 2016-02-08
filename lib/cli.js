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

  const templName = cli.flags.template;
  const schemeName = cli.flags.scheme;
  const shade = cli.flags.shade;

  const templPath = path.join(__dirname, `db/templates/${templName}/${shade}.nunjucks`);
  const schemePath = path.join(__dirname, `db/schemes/${schemeName}.yml`);

  const templ = await fs.readFile(templPath, 'utf8');
  const scheme = await fs.readFile(schemePath, 'utf8');
  const theme = buildTheme(scheme, templ);

  console.log(theme);
})();
