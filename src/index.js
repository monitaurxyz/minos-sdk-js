

const API = require("./api");
const Ethers = require("./ethers");
const InjectionLogging = require("./injectionLogger");
const { v4: uuidv4  } = require('uuid');


class Minos {
  constructor(config = {}) {
    this.api = new API(config);
    this.ethers = new Ethers(config);

    this.injectionLogging = null;
    this.sessionId = uuidv4();
    // Automatically capture the browser information upon initialization
    this.browserInfo = this.captureBrowserInfo();
    this.selectedAddress = this.getSelectedAddress();
    }
    
    captureBrowserInfo() {
        if (typeof window !== 'undefined') { // Ensure window object is available
          const domain = window.location.hostname;
          const path = window.location.pathname;
          const userAgent = window.navigator.userAgent;

          console.log("Captured Browser Info:", { domain, path, userAgent }); // Log the captured info
    
          return {
            domain,
            path,
            userAgent
          };
        } else {
          return {
            domain: null,
            path: null,
            userAgent: null
          };
      }
  }

  getSelectedAddress() {

    if(typeof window !== 'undefined' && window.ethereum && window.ethereum.selectedAddress) {
      console.log("Selected Address:", window.ethereum.selectedAddress);
      return window.ethereum.selectedAddress;

    } else {
      return null;
    }
  }
 
  
  

  // Initialize InjectionLogging with the user's provider
  initializeInjectionLogging(provider) {
    console.log(this.selectedAddress);
    if (
      this.browserInfo &&
      this.browserInfo.domain &&
      this.browserInfo.path &&
      this.browserInfo.userAgent &&
      this.selectedAddress
    ) {
      this.injectionLogging = new InjectionLogging(
        provider,
        this.api.config.token,
        this.sessionId,
        this.browserInfo,
        this.selectedAddress
      );
    } else {
      console.error(
        "Browser info is not present. InjectionLogging was not initialized."
      );
    }
}

  logSessionData(level, message, context, userId, address) {
    const sessionId = this.sessionId;
    const browserInfo = this.browserInfo;
    this.api[level](message, context, userId, address, sessionId, browserInfo);
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
    return this.logSessionData("info", message, context, userId, address, this.sessionId, this.browserInfo);
  }

  debug(message, context, userId, address) {
    return this.logSessionData("debug", message, context, userId, address, this.sessionId);
  }

  trace(message, context, userId, address) {
    return this.logSessionData("trace", message, context, userId, address, this.sessionId);
  }
}

module.exports = Minos;
