const AbstractPeople = require("./abstractPeople");
const {swapiFunctions} = require("../index");
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
    const url = `https://swapi.dev/api/people/${this.id}`;
    const body = await swapiFunctions.genericRequest(url, 'GET', null)
    this.name = Boolean(body.name) ? body.name : '';
    this.mass = Boolean(body.mass) ? Number(body.mass) : '';
    this.height = Boolean(body.height) ? Number(body.height) : '';
    this.homeworlId = '';
    this.homeworldName = '';

    const PlanetId = CommonPeople.getId(body.homeworld);
    console.log("planeta", PlanetId);
  }

  static getId( url ) {
    return url.slice(30, -1);
  } 
}

module.exports = CommonPeople;