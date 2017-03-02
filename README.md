[circle.ci-master-badge]: https://circleci.com/gh/eugene-matvejev/battleship-game-gui-react-js/tree/master.svg?style=svg
[circle.ci-master-link]: https://circleci.com/gh/eugene-matvejev/battleship-game-gui-react-js/tree/master
[codecov.io-master-badge]: https://circleci.com/gh/eugene-matvejev/battleship-game-gui-react-js/branch/master/graph/badge.svg
[codecov.io-master-link]: https://circleci.com/gh/eugene-matvejev/battleship-game-gui-react-js/branch/master

[circle.ci-heroku-badge]: https://circleci.com/gh/eugene-matvejev/battleship-game-gui-react-js/tree/heroku.svg?style=svg
[circle.ci-heroku-link]: https://circleci.com/gh/eugene-matvejev/battleship-game-gui-react-js/tree/heroku
[codecov.io-heroku-badge]: https://circleci.com/gh/eugene-matvejev/battleship-game-gui-react-js/branch/heroku/graph/badge.svg
[codecov.io-heroku-link]: https://circleci.com/gh/eugene-matvejev/battleship-game-gui-react-js/branch/heroku

|                       | master                                                         | heroku                   
|---                    |---                                                             |---
| __tests__             |
| _< Circle CI >_ build | [![build][circle.ci-master-badge]][circle.ci-master-link]      | [![build][circle.ci-heroku-badge]][circle.ci-heroku-link]
| __coverage__          |
| codecov.io            | [![coverage][codecov.io-master-badge]][codecov.io-master-link] | [![coverage][codecov.io-heroku-badge]][codecov.io-heroku-link]


# Battleship Game GUI on react.js [WIP]

project target: re-do https://github.com/eugene-matvejev/battleship-game-gui using react-js

## used technologies
 * node.js
 * react.js
 * jest
 * npm
 * yarn
 
## how to install
 * ```$ npm start``` - init app in "development" environment
 * OPTIONAL:
  * ```$ npm run generate:settings``` - to generate settings [_src/parameters.json_]
  * ```$ npm run generate:css``` - to generate CSS from LESS
  * ```$ npm run generate:css:w``` - watch LESS files for changes and compile CSS in runtime
 * TO DEPLOY:
  * ```$ npm run build``` - compile app and assets, compiled app will be located in __./build__ directory
  
## used enviroment variables
 * __BASE_URL__ - API endpoint host example: https://api.game.local
  * ```$ export BASE_URL="https://api.game.local"```

## how to run tests
 * ```$ npm test```
 * OPTIONAL:
  * ```-- --coverage``` to generate coverage report [located in __./coverage__ directory]
