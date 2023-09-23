const { swapiFunctions } = require("../index");
class Planet {
  constructor(id) {
    this.id = id;
    this.name = null;
    this.gravity = null;
  }

  async init() {
    const url = `https://swapi.dev/api/planets/${this.id}`;
    const body = await swapiFunctions.genericRequest(url, "GET", null);
    
    this.name = body.name;
    this.gravity = Boolean(body.gravity) ? Planet.fixGravity(body.gravity) : '';
    
  }

  getName() {
    return this.name;
  }

  getGravity() {
    return this.gravity;
  }

  static fixGravity(value) {
    const cadena = value.split(" ");
    const index = cadena.findIndex((i) => i == "standard");
    const newgravity = index > -1 ? parseFloat(cadena[index - 1]) : null;
    return newgravity;
  }
}
module.exports = Planet;