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
  const cli = meow('man');

  const schemeName = cli.flags.s;
  const templName = cli.flags.t;

  const templPath = toRelativePath(`db/templates/${templName}.nunjucks`);
  const schemePath = toRelativePath(`db/schemes/${schemeName}.yml`);

  const templ = await fs.readFile(templPath, 'utf8');
  const scheme = await fs.readFile(schemePath, 'utf8');

  const theme = buildTheme(scheme, templ);

  const outDirPath = `output/${templName}`;
  await mkdirp(outDirPath);

  const outPath = path.join(outDirPath, schemeName);
  await fs.writeFile(outPath, theme);
}());
