![header picture](public/img/header.png)

# data.webuild.sg

[![Dependency Status](https://gemnasium.com/webuildsg/data.svg)](https://gemnasium.com/webuildsg/data) [![Build Status](https://travis-ci.org/webuildsg/data.svg)](https://travis-ci.org/webuildsg/data)

> Using data and graphs to inspire variety, openness and projects for the design and engineering community in Singapore

## install

1. clone this repository: `git clone git@github.com:webuildsg/data.git`
- install all the required packages with `npm i`
- start the website with `npm start`
- run all tests and linting with `npm test`
- build `html` file from `*.pug` templates with `npm run build:html`
- build all `*.json` data to plot graphs with `npm run build:graph`
- remove all built files with `npm run clean`
- check that all data snapshot files are in the correct format with `npm run check`

## data

A daily scheduler stores the data snapshots for [events](https://github.com/webuildsg/data/tree/gh-pages/data/events/v1) and [repos](https://github.com/webuildsg/data/tree/gh-pages/data/repos/v1):

1. `*.json` format
- file name format `{type}_archive_YYYY_MM_DD_HHMMSS.json`
- folder `data/{type}/v1/{filename}` for version compatibility in case there are api changes in the future
- `{type}` includes `repos` or `events`

## contribute

This project is an [OPEN Open source project](http://openopensource.org/).

Please see [`CONTRIBUTING.md`](CONTRIBUTING.md) for details.

## credits

- [Icomoon free SVG icons](https://icomoon.io/#icons-icomoon)

## license

Released under an [MIT license](LICENSE)
