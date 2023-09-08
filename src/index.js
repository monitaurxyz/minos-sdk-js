// const API = require("./api");

// class Minos {
//   init(config = {}) {
//     const api = new API(config);
//     return api.init();
//   }
// }

// module.exports = new Minos();

const API = require("./api");
const Ethers = require("./ethers");
const InjectionLogging = require("./injectionLogger");

class Minos {
  constructor(config = {}) {
    this.api = new API(config);
    this.ethers = new Ethers(config);
    this.injectionLogging = null;
  }

  // Initialize InjectionLogging with the user's provider
  initializeInjectionLogging(provider) {
    this.injectionLogging = new InjectionLogging(provider, this.api.config.token);
  }

  fatal(message, context, userId, address) {
    return this.api.fatal(message, context, userId, address);
  }

  warn(message, context, userId, address) {
    return this.api.warn(message, context, userId, address);
  }

  error(message, context, userId, address) {
    return this.api.error(message, context, userId, address);
  }

  info(message, context, userId, address) {
    return this.api.info(message, context, userId, address);
  }

  debug(message, context, userId, address) {
    return this.api.debug(message, context, userId, address);
  }

  trace(message, context, userId, address) {
    return this.api.trace(message, context, userId, address);
  }
}

module.exports = Minos;
