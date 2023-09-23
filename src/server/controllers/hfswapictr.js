const {peopleFactory} = require('../../app/People');
const {planetFactory} = require('../../app/Planet');

const test = async (res, app) => {
  const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
  res.send(data);
};
const getPeople = async (req, res) => {
  const { id } = req.params;

  const data = await peopleFactory(id, "notWookie")

  if (!Boolean(data.name)) return res.status(400).json({message: 'Personaje no encontrado'})

  const result = {
    id: data.id,
    name: data.getName(),
    mass: data.getMass(),
    height: data.getHeight(),
    homeworldName: data.getHomeworldName(),
    homeworlId: data.getHomeworlId(),
  };

  return res.status(200).json(result);
};
const getPlanet = async (req, res) => {
  const { id } = req.params;
  const data = await planetFactory(id);

  if (!Boolean(data.name)) return res.status(400).json({message: 'Planeta no encontrado'})

  const result = {
    id: data.id,
    name: data.getName(),
    gravity: data.getGravity(),
  };

  return res.status(200).json(result);
};
const getWeightOnPlanetRandom = async (req, res) => {};
const getLogs = async (req, res, app) => {};

module.exports = {test, getPeople, getPlanet, getWeightOnPlanetRandom, getLogs};
