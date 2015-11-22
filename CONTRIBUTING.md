#Contribute to data.webuild.sg

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

##general

1. Fork this project and install the packages with `npm i`
- Create a new feature/patch branch
- Code code code
- Run `npm test` to check all linting and tests are passing
- Write a [good commit message](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit) in the format `<type>(<scope>): <subject>`
- Pull request using the new feature/patch branch
- Ensure the [Travis build passes](https://travis-ci.org/webuildsg/data)

##add another graph

1. all required data in `*.json` format are in the `data` folder
- write code to create a `json` data that will plot the graph in the folder `graphs`
- you can use the common utility function in folder `tasks/utils.js` to create the graph
- ensure you write this `json` data in a file under the folder `public/data` so that the frontend can query it
- run `npm run build` to create this data in folder `public/data/*.json`
- add the frontend script to create eh graph with `d3js` in folder `public/js`
- add the link to the scripts in `views/index.jade`
- amend the view file to display the graph in file `views/index.jade`
- run `npm start` to view the website with the graph
