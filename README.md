#data.webuild.sg

[![Dependency Status](https://gemnasium.com/webuildsg/data.svg)](https://gemnasium.com/webuildsg/data) [![Build Status](https://travis-ci.org/webuildsg/data.svg)](https://travis-ci.org/webuildsg/data)

> Using data and graphs to inspire variety, openness and projects for the design and engineering community in Singapore

##install

1. clone this repository: `git clone git@github.com:webuildsg/data.git`
- install all the required packages with `npm i -g http-server && npm i`
- start the website with `npm start`

##data

A daily scheduler stores the data snapshots for [events](https://github.com/webuildsg/data/tree/gh-pages/data/events/v1) and [repos](https://github.com/webuildsg/data/tree/gh-pages/data/repos/v1):

1. `*.json` format
- file name format `{type}_archive_YYYY_MM_DD_HHMMSS.json`
- folder `data/{type}/v1/{filename}` for version compatibility in case there are api changes in the future
- `{type}` includes `repos` or `events`

#contribute

Please see [`CONTRIBUTING.md`](CONTRIBUTING.md) for details.

##license

Released under an [MIT license](LICENSE)
