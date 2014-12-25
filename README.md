#Archives

> This repository stores the daily data for [repos](https://webuild.sg/api/v1/repos) and [events](https://webuild.sg/api/v1/events) from [We Build SG](https://webuild.sg/)

###Format

Files are stored as:

1. `*.json` format
- filename format `{type}_archive_YYYY_MM_DD_HHMMSS.json` 
- folder `{type}/v1/{filename}` for version compatibility in case there are api changes in the future
- `{type}` includes `repos` or `events`

###Scheduling

The archival takes place every day from [Heroku](https://www.heroku.com/) with a daily scheduler.

###Todo

The data gathered will be used to plot charts and graphs on the future website `data.webuild.sg` to track useful trends and topics in relation to technology tools, open events, open source, etc.

