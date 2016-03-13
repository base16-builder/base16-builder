<h1>
	<img src="https://cloud.githubusercontent.com/assets/2873986/13090600/00486fe4-d4f7-11e5-9bdb-fc814a3c6e77.png" alt="Base16 Builder">
</h1>

_**Base16 Builder** is a nimble command-line tool that generates themes for your favourite programs. See it in action below:_

![](https://camo.githubusercontent.com/ddfcd564006e0f6f6f24abeb1b9424cb71c97ddd/68747470733a2f2f692e696d6775722e636f6d2f6c416e7670526a2e676966)

Base16 Builder is easy to use. All you have to do is supply a [**color `s`cheme**](https://github.com/alexbooker/base16-builder/tree/master/db/schemes), [**`t`emplate**](https://github.com/alexbooker/base16-builder/tree/master/db/templates), and **`b`rightness** (`light` or `dark`). Base16 Builder will use the information you provide to generate a theme and write it to `stdout`. 

Because Base16 Builder writes to `stdout`, it's possible to pipe the theme anywhere you like. In the above screencast, the theme is piped to a new file called `theme`, but this could just as well have been a configuration file like `.Xresources`. 

## Features

This project aims to rejuvenate [Chris Kempson's original tool](https://github.com/chriskempson/base16-builder) by incorporating some fresh features:

- [Under active development](https://github.com/alexbooker/base16-builder/pulse/monthly)
- [Well-tested](https://github.com/alexbooker/base16-builder/tree/master/tests)
- Simple to use
- Simpler to [install](https://github.com/alexbooker/base16-builder#installation)
- Writes themes to  [`stdout`](https://en.wikipedia.org/wiki/Standard_streams#Standard_output_.28stdout.29)
- Written in uncomplicated JavaScript

## Installation

```
$ npm install --global base16-builder
```

<sub>You'll mneed [here](https://docs.npmjs.com/getting-started/installing-node). npm comes installed alongside Node.js.</sub>

## Usage

```bash
  Usage:
    $ base16-builder [-s <scheme>] [-t <template>] [-b <light|dark>]
    $ base16-builder [-s <scheme path>] [-t <template path>]
    
  Options:
    -s, --scheme        Build theme using this color scheme
    -t, --template      Build theme using this template
    -b, --brightness    Build theme using this brightness
    -h, --help          Show this menu
    
  Commands:
    ls schemes      Opens an offline web page with a list of scheme names and their colors
    ls templates    Writes a list of available templates to the terminal
    
  Examples:
    $ base16-builder -s oceanicnext -t rxvt-unicode -b dark
    $ base16-builder --scheme oceanicnext --template rxvt-unicode --brightness dark
    $ base16-builder --scheme schemes/customScheme.yml --template templs/customTempl.ejs
    $ base16-builder ls schemes
    $ base16-builder ls templates
```

## Build Status

| Windows | Linux |
|:------:|:------:|
|[![Build status](https://ci.appveyor.com/api/projects/status/6xckfbsriju345cd?svg=true)](https://ci.appveyor.com/project/alexbooker/base16-builder) | [![Build Status](https://travis-ci.org/alexbooker/base16-builder.svg?branch=master)](https://travis-ci.org/alexbooker/base16-builder) |

## Attribution

- [Original project](https://github.com/chriskempson/base16-builder) by [Chris Kempson](https://github.com/chriskempson)
- Numerous templates and schemes were contributed to the [original project]((https://github.com/chriskempson/base16-builder)) by various [contributors](https://github.com/chriskempson/base16-builder/graphs/contributors)
- Logo by [Phis](https://github.com/Phisherman)
