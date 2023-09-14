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
    this.sessionId = this.generateSessionId();

  }

  generateSessionId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  }

  // Initialize InjectionLogging with the user's provider
  initializeInjectionLogging(provider) {
    this.injectionLogging = new InjectionLogging(provider, this.api.config.token);
  }

  logSessionData(level, message, context, userId, address) {
    const sessionId = this.sessionId;
    this.api[level](message, context, userId, address, sessionId);
  }

  fatal(message, context, userId, address) {
    console.log("fatal", message, context, userId, address, this.sessionId);
    return this.logSessionData("fatal", message, context, userId, address, this.sessionId);
  }

  warn(message, context, userId, address) {
    console.log("fatal", message, context, userId, address, this.sessionId);
    return this.logSessionData("warn", message, context, userId, address, this.sessionId);
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
