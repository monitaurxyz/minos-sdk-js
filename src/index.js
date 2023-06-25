const API = require("./api");

class Minos {
  init(config = {}) {
    const api = new API(config);
    return api.init();
  }
}

module.exports = new Minos();
