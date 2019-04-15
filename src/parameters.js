export default {
    minGameSize: parseInt(process.env['REACT_APP_GAME-MIN-SIZE'], 10),
    maxGameSize: parseInt(process.env['REACT_APP_GAME-MAX-SIZE'], 10),
    minOpponents: parseInt(process.env['REACT_APP_GAME-MIN-OPPONENTS'], 10),
    maxOpponents: parseInt(process.env['REACT_APP_GAME-MAX-OPPONENTS'], 10),
    api: {
        protocol: process.env['REACT_APP_API_PROTOCOL'],
        host: process.env['REACT_APP_API_HOST'],
        port: parseInt(process.env['REACT_APP_API_PORT'], 10),
    },
    routes: {
        login: "/login",
        game: {
            results: "/game/results"
        }
    }
}
