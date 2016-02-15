#Base16 Builder

----

_**:hammer: Base16 Builder** is a nimble command-line tool that generates themes for your favourite programs. See it in action below:_

![](https://camo.githubusercontent.com/ddfcd564006e0f6f6f24abeb1b9424cb71c97ddd/68747470733a2f2f692e696d6775722e636f6d2f6c416e7670526a2e676966)

Base16 Builder is simple to use. All you have to do is supply a color [_`s`cheme_](https://github.com/alexbooker/base16-builder/tree/master/db/schemes), [_`t`emplate_](https://github.com/alexbooker/base16-builder/tree/master/db/templates), and _`b`rightness_ value (`light` or `dark`). Base16 Builder will use that information to generate a theme and write it to [`stdout`](https://en.wikipedia.org/wiki/Standard_streams#Standard_output_.28stdout.29). 

Because Base16 Builder writes to `stdout`, it's possible to [pipe](https://en.wikipedia.org/wiki/Pipeline_(Unix)) the theme anywhere! In the above demo, the theme is sent to a new file called `theme` but this could just as well have been a configuration file like [`~/.Xresources`](https://wiki.archlinux.org/index.php/X_resources). 

P.S. The terminal emulator and Vim instance you see above were themed using this tool and the [gooey color scheme](https://github.com/alexbooker/base16-builder/blob/master/db/schemes/gooey.yml).

## Features

This project aims to rejuvenate [@ChrisKempson](https://github.com/chriskempson)'s [original tool](https://github.com/chriskempson/base16-builder) by incorporating fresh features:


- [Under active development](https://github.com/alexbooker/base16-builder/pulse/monthly)
- [Well-tested](https://github.com/alexbooker/base16-builder/tree/master/tests)
- Simple to [install](https://github.com/alexbooker/base16-builder#installation)
- Intuitive
- Writes themes to  [`stdout`](https://en.wikipedia.org/wiki/Standard_streams#Standard_output_.28stdout.29)
-  [Modular](https://github.com/alexbooker/base16-builder#ecosystem)
- Works on Linux, OS X, and Windows.
- Active and friendly maintainers. Come join the conversation on [Gitter](https://gitter.im/alexbooker/base16-builder)
- Community project. [Pull requests are ~~welcome~~ _encouraged_!](http://makeapullrequest.com/)
- Written in uncomplicated JavaScript
- Hundreds of themes and templates to suit everyone's tastes

## Installation

For your convenience, Base16 Builder is available on npm:

```
$ npm install --global base16-builder
```

<small>If you don't have Node.js, you need to install it too. Installation instructions can be found [here](https://docs.npmjs.com/getting-started/installing-node).</small>

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
## Ecosystem

- [**bb16-schemer:**](https://github.com/aloisdg/bb16-schemer) A wrapper to manage a group of template
- [**generator-bb16-scheme:**](https://github.com/aloisdg/generator-bb16-scheme) This project is a yeoman generator. It helps you to create schemes for base16-builder.


## Attribution

- [Original project](https://github.com/chriskempson/base16-builder) by [@ChrisKempson](https://github.com/chriskempson)
- Many templates and schemes were contributed to the original project by various [contributors](https://github.com/chriskempson/base16-builder/graphs/contributors)
- Logo by [@Phisherman (A.K.A Phis)](https://github.com/Phisherman)

## Build Status

| Windows | Linux |
|:------:|:------:|
|[![Build status](https://ci.appveyor.com/api/projects/status/6xckfbsriju345cd?svg=true)](https://ci.appveyor.com/project/alexbooker/base16-builder) | [![Build Status](https://travis-ci.org/alexbooker/base16-builder.svg?branch=master)](https://travis-ci.org/alexbooker/base16-builder) |

## License

The MIT License (MIT)
