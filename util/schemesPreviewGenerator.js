const nunjucks = require('nunjucks');
const fs = require('fs-promise');
const path = require('path');
const yaml = require('js-yaml');
const Promise = require('bluebird');

const schemesDir = '../db/schemes';

fs
  .readdir(schemesDir)
  .then(function(schemeFileNames) {
    const promises = [];
    schemeFileNames.forEach(function(schemeFileName) {
      promises.push(fs.readFile(path.join(schemesDir, schemeFileName), 'utf-8'));
    });
    Promise.all(promises).then(function(yamlSchemes) {
      yamlSchemes = yamlSchemes.map(yamlScheme => yaml.load(yamlScheme));
      fs
        .readFile('./schemesPreview.nunJucks', 'utf-8')
        .then(function(templ) {
          const preview = nunjucks.renderString(templ, {
            schemes: yamlSchemes
          });
          fs.writeFile('../dist/index.html', preview);
        });
    });
  });
