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
const getWeightOnPlanetRandom = async (req, res) => {
  const RandomPlanet = RamdomId(60);
  const RandomPeople = RamdomId(82);

  const people = await peopleFactory(RandomPeople, "");
  if (!Boolean(people.name)) return res.status(400).json({message: 'Personaje no encontrado'})

  try {
    const result = await people.getWeightOnPlanet(RandomPlanet)
    return res.json(result.data); 
  } catch (error) {
    return res.status(400).json({message: error.message})
  }
};
const getLogs = async (req, res, app) => {};

const _isWookieeFormat = (req) => {
  if (req.query.format && req.query.format == "wookiee") {
    return true;
  }
  return false;
};

const RamdomId = (max) => {
  return Math.floor(Math.random() * max);
};

module.exports = {test, getPeople, getPlanet, getWeightOnPlanetRandom, getLogs};
