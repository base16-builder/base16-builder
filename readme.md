<h1 align="center">
	<img width="360" src="http://i.imgur.com/1vPwEtQ.png" alt="Base16 Builder">
</h1>

> *:hammer: Base16 Builder is a nimble command-line tool that generates themes for your favourite programs. See it in action below.*

<p align="center">
  <img src="https://i.imgur.com/lAnvpRj.gif">
</p>


**Explaination:** Give `base16-builder` a [color `s`heme](https://github.com/alexbooker/base16-builder/tree/master/db/schemes), [`t`emplate](https://github.com/alexbooker/base16-builder/tree/master/db/templates), and `b`rightness. Get a theme that you can pipe or copy into a relevant configuration file. 

The terminal emulator and Vim instance you see above were themed using this tool and the [gooey color scheme](https://github.com/alexbooker/base16-builder/blob/master/db/schemes/gooey.yml).

## Installation

For your convenience, Base16 Builder is available on [npm](https://www.npmjs.com/package/base16-builder):

```bash
$ npm install -g base16-builder
```

## Usage

```
$ base16-builder --help 

	Usage:
		$ base16-builder <command>
		$ base16-builder [-s <scheme>] [-t <template>] [-b <light|dark>]
		$ base16-builder [-s <scheme path>] [-t <template path>]

	Options:
		-s, --scheme      Build theme using this color scheme
		-t, --template    Build theme using this template
		-b, --brightness  Build theme using this brightness

	Examples:
		$ base16-builder -s oceanicnext -t i3wm -b dark
		$ base16-builder --scheme oceanicnext --template i3wm --brightness dark
		$ base16-builder --scheme schemes/customScheme.yml --template templs/customTempl.nunjucks
```

## Attribution

The original Base16 Builder tool was built by [@chriskempson](https://github.com/chriskempson) and can be viewed [here](https://github.com/chriskempson/base16-builder). What you are looking at here is an independent copy of the original repository (i.e. a [fork](https://www.quora.com/What-does-it-mean-to-fork-on-GitHub)).

The logo was generously provided by the talented [@Phisherman](https://github.com/Phisherman).

## Build Status

| Windows | Linux |
|:------:|:------:|
|[![Build status](https://ci.appveyor.com/api/projects/status/6xckfbsriju345cd?svg=true)](https://ci.appveyor.com/project/alexbooker/base16-builder) | [![Build Status](https://travis-ci.org/alexbooker/base16-builder.svg?branch=master)](https://travis-ci.org/alexbooker/base16-builder) |

## License

The MIT License (MIT)

Copyright (c) 2016 Alex Booker
