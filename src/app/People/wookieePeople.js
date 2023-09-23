const AbstractPeople = require("./abstractPeople");
const {swapiFunctions} = require("../index");
const {planetFactory} = require('../../app/Planet');

class wookieePeople extends AbstractPeople {
  constructor(id) {
    super(id);
    this.id = id;
    this.name = null;
    this.mass = null;
    this.height = null;
    this.homeworldName = null;
    this.homeworlId = null;
  }

  async init() {
    const url = `https://swapi.dev/api/people/${this.id}?format=wookiee`;
    const body = await swapiFunctions.genericRequest(url, "GET", null);

    this.name = Boolean(body.whrascwo) ? body.whrascwo : "";
    this.mass = Boolean(body.scracc) ? Number(body.scracc) : "";
    this.height = Boolean(body.acwoahrracao) ? Number(body.acwoahrracao) : "";
    this.homeworlId = "";
    this.homeworldName = "";

    const PlanetId = wookieePeople.getId(body.acooscwoohoorcanwa);
    const planet = await planetFactory(PlanetId);

    this.homeworlId = Number(PlanetId);
    this.homeworldName = Boolean(planet.name) ? planet.name : "";
  }

  async getWeightOnPlanet(planetId) {
    const planet = await planetFactory(planetId);

    if (!Boolean(planet.name)) throw new Error(`El planeta ingresado (${planetId}) no exite`)

    if(planetId == this.homeworlId) throw new Error("Error: No se puede calcular en el planeta natal");
    
    const result = swapiFunctions.getWeightOnPlanet(this.mass, planet.getGravity())
    if(result) {
      return {
        success: true,
        data: {
          characterId: this.id,
          homeWorldId: Number(this.homeworlId),
          planetId: planetId,
          characterWeight: result
        }
      }
    } else { 
      throw new Error(`Error: No se pudo calcular el peso del personaje`)  
    }
  }

  static getId(url) {
    return url.slice(50, -1);
  }
}

module.exports = wookieePeople