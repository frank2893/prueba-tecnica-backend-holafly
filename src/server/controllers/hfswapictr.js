const {peopleFactory} = require('../../app/People');

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
    name: data.name,
    mass: data.mass,
    height: data.height,
    homeworldName: data.homeworldName,
    homeworlId: data.homeworlId,
  };

  return res.status(200).json(result);
};
const getPlanet = async (req, res) => {
  const { id } = req.params;

  console.log("planet", id);

  return id;
};
const getWeightOnPlanetRandom = async (req, res) => {};
const getLogs = async (req, res, app) => {};

module.exports = {test, getPeople, getPlanet, getWeightOnPlanetRandom, getLogs};
