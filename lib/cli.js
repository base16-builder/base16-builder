#!/usr/bin/env node

import meow from 'meow';

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

  meow(optionsText, {
    alias: {
      h: 'help'
    }
  });
})();
