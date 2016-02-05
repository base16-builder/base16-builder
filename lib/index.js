import yaml from 'js-yaml';
import nunjucks from 'nunjucks';

function generateContext(scheme) {
  const context = {
    scheme: scheme.scheme,
    author: scheme.author,
    base: {}
  };
  Object.keys(scheme).forEach(function(propName) {
    const matches = propName.match(/^base(.+?)$/);
    if (matches) {
      const base = matches[1];
      const color = scheme[propName];
      context.base[base] = {
        hex: color
      };
    }
  });
  return context;
}

function buildTheme(yamlScheme, nunjucksTempl) {
  const scheme = yaml.load(yamlScheme);
  const context = generateContext(scheme);
  const theme = nunjucks.renderString(nunjucksTempl, context);
  return theme;
}

export {
  generateContext,
  buildTheme
};
