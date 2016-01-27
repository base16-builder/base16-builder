#!/usr/bin/env node

import path from 'path';
import fs from 'fs-promise';
import meow from 'meow';
import mkdirp from 'mkdirp-promise';
import {
  buildTheme
}
from './';

function toRelativePath(bar) {
  return path.join(__dirname, bar);
}

(async function() {
  const cli = meow(`Usage:
  $ base16-builder [-s <scheme>] [-t <template>]

Options:
  -s, --scheme Build theme using this color scheme
  -t, --template Build theme using this template

Examples:
  $ base16-builder -s oceanicnext -t i3wm
  $ base16-builder --scheme oceanicnext --template i3wm`, {
    alias: {
      t: 'template',
      s: 'scheme'
    }
  });

  const schemeName = cli.flags.s;
  const templName = cli.flags.t;

  if (!schemeName || !templName) {
    const error = `fatal: You need to specify *both* a template and a scheme name e.g.:
  base16-builder -t i3wm -s oceanicnext

If you are still having trouble, please refer to the documentation for guidance: https://goo.gl/JwwX13.`;
    console.error(error);
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
  } catch (e) {
    if (/\/schemes\//.test(e.path)) {
      console.error(`Could not find a scheme called \"${schemeName}\". It is likely that no scheme with this
 name exists. For a complete list of schemes, see the database: https://goo.gl/ntnS1I`);
    } else if (/templates/.test(e.path)) {
      console.error(`Could not find a template called \"${templName}\". It is likely that no template with this
name exists. For a complete list of templates, see the database: https://goo.gl/fhm4Ct`);
    }
  }
}());
