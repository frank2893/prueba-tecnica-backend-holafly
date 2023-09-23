const { getPeople, getPlanet, getWeightOnPlanetRandom, getLogs, test } = require('../controllers/hfswapictr')

const applySwapiEndpoints = (server, app) => {
    server.get('/hfswapi/getPeople/:id', getPeople);
    server.get('/hfswapi/getPlanet/:id', getPlanet);
    server.get('/hfswapi/getWeightOnPlanetRandom', getWeightOnPlanetRandom);
    server.get('/hfswapi/getLogs', getLogs);
    server.get('/hfswapi/test', test);
}

module.exports = applySwapiEndpoints;