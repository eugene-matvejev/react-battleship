[ci.tests-master-badge]: https://circleci.com/gh/eugene-matvejev/battleship-game-gui-react-js/tree/master.svg?style=svg
[ci.tests-master]: https://circleci.com/gh/eugene-matvejev/battleship-game-gui-react-js/tree/master
[ci.coverage-master-badge]: https://codecov.io/gh/eugene-matvejev/battleship-game-gui-react-js/branch/master/graph/badge.svg
[ci.coverage-master]: https://codecov.io/gh/eugene-matvejev/battleship-game-gui-react-js/branch/master

[ci.tests-heroku-badge]: https://circleci.com/gh/eugene-matvejev/battleship-game-gui-react-js/tree/heroku.svg?style=svg
[ci.tests-heroku]: https://circleci.com/gh/eugene-matvejev/battleship-game-gui-react-js/tree/heroku
[ci.coverage-heroku-badge]: https://codecov.io/gh/eugene-matvejev/battleship-game-gui-react-js/branch/heroku/graph/badge.svg
[ci.coverage-heroku]: https://codecov.io/gh/eugene-matvejev/battleship-game-gui-react-js/branch/heroku

|                  | master                                                        | heroku
|---               |---                                                            |---
| __tests__        |
| _< Circle CI >_  | [![tests][ci.tests-master-badge]][ci.tests-master]            | [![tests][ci.tests-heroku-badge]][ci.tests-heroku]
| __coverage__     |
| _< codecov.io >_ | [![coverage][ci.coverage-master-badge]]([ci.coverage-master]) | [![coverage][ci.coverage-heroku-badge]][ci.coverage-heroku]

# Battleship Game GUI [on react.js]

```
targets/goals : WIP
* to demostrate:
 ** QA Automation knowledge, and best practices [jest/enzyme/cypress]
 ** DRY/KISS/SOLID principles
 ** DevOps knowledge [Docker/CI/CD etc]
 ** react.js best practices

* DONE: implement form engine
 ** DONE: generic handler
 ** DONE: generic inputs
 ** DONE: generic validation engine
```

## THIS IS SPARE TIME PROJECT, WORK IN PROGRESS!

### software requirements

* [node.js](https://nodejs.org/) v8+
* [npm](https://www.npmjs.com/) v5+ or [yarn](https://yarnpkg.com/)
* __optional__ [makefile](https://en.wikipedia.org/wiki/Makefile) comes out of the box in *nix enviroments

### used technologies

* [node.js](https://nodejs.org/)
* [react.js](https://reactjs.org/)
* [sass](https://sass-lang.com/)
* [jest](https://facebook.github.io/jest/)
* [enzyme](http://airbnb.io/enzyme/)
* [cypress](https://www.cypress.io/)
* [docker](https://www.docker.com/)
* [docker-compose](https://docs.docker.com/compose/)

### used services

* [CircleCI](https://circleci.com/dashboard)
* [codecov.io](https://codecov.io/)
* [CodeClimate](https://codeclimate.com/)
* [snyk.io](https://snyk.io/)
* [heroku](https://www.heroku.com/)

### how to install

* if you're using `make` commands no actions required, you need to have intalled [docker](https://docs.docker.com/install/) v18.09+ and [docker-compose](https://docs.docker.com/compose/install/) v3+ [for 'cypress' integration tests only]
  * otherwise you need nodejs v8.4+ with npm, then execute `$ npm i`

### how to run tests

* 'cypress' integration tests: `$ make cypress` or `$ npm test` inside `./cypress` directory
* 'jest' unit and functional tests: `$ make test` or `$ npm test`
  * __[optional 'jest' CLI params](https://facebook.github.io/jest/docs/en/cli.html)__
    * useful option for CI: `--coverage`, example: `$ npm test -- --coverage` to generate coverage report in __./coverage__ directory
    * path to file, example `$ npm test src/service/processor/game_processor.test.js` to execute tests only in one file

### how to run in 'development' mode

* `$ make`

### how to run in 'production' mode

* `$ make serve`
* __to assemble static assets__
  * `$ make build` - compiled assets will be located in __./build__ directory

### gitflow

* master -> most upto date __production__ version
* __proxy branch__ heroku -> master is not deployed to heroku with every push, because of limiations of 'free account'
* other branches -> 'feature branches' get merged into master
CI build is mandatory check for every PR into master/heroku branches

### used environment variables

* **REACT_APP_GAME-MIN-SIZE** [default 5] as number
* **REACT_APP_GAME-MAX-SIZE** [default 10] as number
* **REACT_APP_GAME-MIN-OPPONENTS** [default 1] as number
* **REACT_APP_GAME-MAX-OPPONENTS** [default 3] as number

* **REACT_APP_API_PROTOCOL** [default "http"]
* **REACT_APP_API_HOST** [default "localhost"]
* **REACT_APP_API_PORT** [default 8081] as number
