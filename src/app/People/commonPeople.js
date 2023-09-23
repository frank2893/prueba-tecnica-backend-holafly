const AbstractPeople = require("./abstractPeople");
const {swapiFunctions, db} = require("../index");
const {planetFactory} = require('../../app/Planet');
class CommonPeople extends AbstractPeople {
  constructor(id) {
    super(id)
    this.id = id;
    this.name = null;
    this.mass = null;
    this.height = null;
    this.homeworldName = null;
    this.homeworlId = null;
  }

  async init() {

    const dbPeople = await db.swPeople.findByPk(this.id);
    
    if (dbPeople) {
      this.name = dbPeople.name;
      this.mass = dbPeople.mass;
      this.height = dbPeople.height;
      this.homeworldName = dbPeople.homeworld_name;
      this.homeworlId = dbPeople.homeworld_id;
    } else {
      const url = `https://swapi.dev/api/people/${this.id}`;
      const body = await swapiFunctions.genericRequest(url, "GET", null);
      this.name = Boolean(body.name) ? body.name : "";
      this.mass = Boolean(body.mass) ? Number(body.mass) : "";
      this.height = Boolean(body.height) ? Number(body.height) : "";
      this.homeworlId = "";
      this.homeworldName = "";

      const PlanetId = CommonPeople.getId(body.homeworld);
      const planet = await planetFactory(PlanetId);

      this.homeworlId = Number(PlanetId);
      this.homeworldName = Boolean(planet.name) ? planet.name : "";

      await db.swPeople.create({
        id: this.id,
        name: this.name,
        mass: this.mass,
        height: this.height,
        homeworld_name: this.homeworldName,
        homeworld_id: this.homeworlId,
      });
    }
  }

  static getId( url ) {
    return url.slice(30, -1);
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
}

module.exports = CommonPeople;