const fs = require('fs-promise')
const path = require('path')
const yaml = require('js-yaml')
const Promise = require('bluebird')
const ejs = require('ejs')

const schemesDir = path.join(__dirname, '../db/schemes')

fs
  .readdir(schemesDir)
  .then(function (schemeFileNames) {
    const promises = []
    schemeFileNames.forEach(function (schemeFileName) {
      promises.push(fs.readFile(path.join(schemesDir, schemeFileName), 'utf-8'))
    })
    return Promise.all(promises).then(function (yamlSchemes) {
      yamlSchemes = yamlSchemes.map(yamlScheme => yaml.load(yamlScheme))
      return fs
        .readFile(path.join(__dirname, './schemesPreview.ejs'), 'utf-8')
        .then(function (templ) {
          const preview = ejs.render(templ, {
            schemes: yamlSchemes
          })
          return fs.writeFile(path.join(__dirname, '../dist/index.html'), preview)
        })
    })
  })
  .catch(function (err) {
    console.error('err', err)
  })
