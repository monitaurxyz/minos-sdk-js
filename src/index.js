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
    this.injectionLogging = new InjectionLogging(provider, this.api.config.token, this.sessionId);
  }

  logSessionData(level, message, context, userId, address) {
    const sessionId = this.sessionId;
    this.api[level](message, context, userId, address, sessionId);
  }

  fatal(message, context, userId, address) {
    return this.logSessionData("fatal", message, context, userId, address, this.sessionId);
  }

  warn(message, context, userId, address) {
    return this.logSessionData("warn", message, context, userId, address, this.sessionId);
  }

  error(message, context, userId, address) {
    return this.logSessionData("earn", message, context, userId, address, this.sessionId);
  }

  info(message, context, userId, address) {
    return this.logSessionData("info", message, context, userId, address, this.sessionId);
  }

  debug(message, context, userId, address) {
    return this.logSessionData("debug", message, context, userId, address, this.sessionId);
  }

  trace(message, context, userId, address) {
    return this.logSessionData("trace", message, context, userId, address, this.sessionId);
  }
}

module.exports = Minos;
