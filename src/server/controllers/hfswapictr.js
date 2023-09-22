const test = async (res, app) => {
  const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
  res.send(data);
};
const getPeople = async (req, res) => {
  const { id } = req.params;

  console.log("peopleId", id);

  return id;
};
const getPlanet = async (req, res) => {
  const { id } = req.params;

  console.log("planet", id);

  return id;
};
const getWeightOnPlanetRandom = async (req, res) => {};
const getLogs = async (req, res, app) => {};

module.exports = {test, getPeople, getPlanet, getWeightOnPlanetRandom, getLogs};
