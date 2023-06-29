// const API = require("./api");

// class Minos {
//   init(config = {}) {
//     const api = new API(config);
//     return api.init();
//   }
// }

// module.exports = new Minos();

const API = require("./api");

class Minos {
  constructor(config = {}) {
    this.api = new API(config);
  }

  fatal(userId, address, message, context) {
    return this.api.fatal(userId, address, message, context);
  }

  warn(userId, address, message, context) {
    return this.api.warn(userId, address, message, context);
  }

  error(userId, address, message, context) {
    return this.api.error(userId, address, message, context);
  }

  info(userId, address, message, context) {
    return this.api.info(userId, address, message, context);
  }

  debug(userId, address, message, context) {
    return this.api.debug(userId, address, message, context);
  }

  trace(userId, address, message, context) {
    return this.api.trace(userId, address, message, context);
  }
}

module.exports = Minos;
