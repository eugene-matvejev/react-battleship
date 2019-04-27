[circle.ci-master-badge]: https://circleci.com/gh/eugene-matvejev/battleship-game-gui-react-js/tree/master.svg?style=svg
[circle.ci-master-link]: https://circleci.com/gh/eugene-matvejev/battleship-game-gui-react-js/tree/master
[codecov.io-master-badge]: https://codecov.io/gh/eugene-matvejev/battleship-game-gui-react-js/branch/master/graph/badge.svg
[codecov.io-master-link]: https://codecov.io/gh/eugene-matvejev/battleship-game-gui-react-js/branch/master

[circle.ci-heroku-badge]: https://circleci.com/gh/eugene-matvejev/battleship-game-gui-react-js/tree/heroku.svg?style=svg
[circle.ci-heroku-link]: https://circleci.com/gh/eugene-matvejev/battleship-game-gui-react-js/tree/heroku
[codecov.io-heroku-badge]: https://codecov.io/gh/eugene-matvejev/battleship-game-gui-react-js/branch/heroku/graph/badge.svg
[codecov.io-heroku-link]: https://codecov.io/gh/eugene-matvejev/battleship-game-gui-react-js/branch/heroku

[slack-logo]: https://a.slack-edge.com/436da/marketing/img/slack_logo.png
[slack-url]: https://join.slack.com/t/myth-project/shared_invite/enQtMjk2NTM0MDA5ODQ3LTg3ZDlmYTBiODIwODI0ZjhhMjc2NTgwMDMwNDc0NWMxNzExYzliM2UwYTEzNGMyMGRiZjg0ZTEyOTYwYzM0OTQ

## join our [![join_us_on_slack][slack-logo]][slack-url] channel

|                  | master                                                         | heroku
|---               |---                                                             |---
| __tests__        |
| _< Circle CI >_  | [![build][circle.ci-master-badge]][circle.ci-master-link]      | [![build][circle.ci-heroku-badge]][circle.ci-heroku-link]
| __coverage__     |
| _< codecov.io >_ | [![coverage][codecov.io-master-badge]][codecov.io-master-link] | [![coverage][codecov.io-heroku-badge]][codecov.io-heroku-link]

# Battleship Game GUI [on react.js]
instructions are written, assuming you work in unix / MacOS env. it still should work with W10 Pro and cygwin

```
targets/goals : WIP
* to demostrate:
    * QA Automation knowledge, and best practices [jest/enzyme/cypress]
    * DRY/KISS/SOLID principles
    * DevOps knowledge [Docker/CI/CD etc]
    * react best practices

* implement form engine
 ** validation engine
 ** inputs
 ** cypress tests

```

## THIS IS SPARE TIME PROJECT, WORK IN PROGRESS!

## software requirements

* [node.js](https://nodejs.org/) v8+
* [npm](https://www.npmjs.com/) v5+ or [yarn](https://yarnpkg.com/)
* __optional__ [makefile](https://en.wikipedia.org/wiki/Makefile) comes out of the box in *nix enviroments

## used technologies

* [react.js](https://reactjs.org/)
* [enzyme](http://airbnb.io/enzyme/)
* [jest](https://facebook.github.io/jest/)
* [sass](https://sass-lang.com/)
* [docker](https://www.docker.com/)

## used services

* [CircleCI](https://circleci.com/dashboard)
* [codecov.io](https://codecov.io/)
* [CodeClimate](https://codeclimate.com/)
* [snyk.io](https://snyk.io/)
* [heroku](https://www.heroku.com/)

## how to install

* if you use `make` commands no actions required, apart of having docker v18.09+ installed
  * otherwise you need node & npm, then execute `$ npm i`

## how to execute tests

* `$ make test` or `$ npm test`
* __[optional jest CLI params](https://facebook.github.io/jest/docs/en/cli.html)__
  * useful option for CI: `--coverage`, example: `$ npm test -- --coverage` to generate coverage report in __./coverage__ directory
  * path to file, example `$ npm test src/service/processor/game_processor.test.js` to execute tests only in one file

## how to run in 'development' mode

* `$ make`

## how to run in 'production' mode

* `$ make serve`
* __to assemble static assets__
  * `$ make build` - compiled assets will be located in __./build__ directory

## how to run tests

* `$ make test` or `$ npm test`

## gitflow

* master -> most upto date __production__ version
* __proxy branch__ heroku -> master is not deployed to heroku with every push, because of limiations of 'free account'
* other branches -> 'feature branches' get merged into master
CI build is mandatory check for every PR into master/heroku branches

## used environment variables

* **REACT_APP_GAME-MIN-SIZE** [default 5] as number
* **REACT_APP_GAME-MAX-SIZE** [default 10] as number
* **REACT_APP_GAME-MIN-OPPONENTS** [default 1] as number
* **REACT_APP_GAME-MAX-OPPONENTS** [default 3] as number

* **REACT_APP_API_PROTOCOL** [default "http"]
* **REACT_APP_API_HOST** [default "localhost"]
* **REACT_APP_API_PORT** [default 8081] as number
