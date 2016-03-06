import yaml from 'js-yaml';
import convertToSlug from 'slug'
import {Environment, FileSystemLoader} from 'nunjucks';

function generateContext(scheme) {
  const context = {
    scheme: scheme.scheme,
    author: scheme.author,
    slug: convertToSlug(scheme.scheme, { lower: true }),
    base: {}
  };
  Object.keys(scheme).forEach(function(propName) {
    const matches = propName.match(/^base(.+?)$/);
    if (matches) {
      const base = matches[1];
      const color = scheme[propName];
      context.base[base] = {
        hex: color,
        hexbgr: color.match(/.{1,2}/g).reverse().join(''),
        dhex: color.match(/.{1,2}/g).map(c => c + c).join(''),
        srgb: color.match(/.{1,2}/g).map(c => parseInt(c, 16) / 255),
        rgb: color.match(/.{1,2}/g).map(c => parseInt(c, 16))
      };
    }
  });
  return context;
}

function buildTheme(yamlScheme, nunjucksTempl) {
  const nunjucks = new Environment(new FileSystemLoader('views'), {
    autoescape: false
  });
  const scheme = yaml.load(yamlScheme);
  const context = generateContext(scheme);
  const theme = nunjucks.renderString(nunjucksTempl, context);
  return theme;
}

export {
  generateContext,
  buildTheme
};
