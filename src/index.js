

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

    // Initialize selectedAddress
    this.waitForEthereum().then((ethereum) => {
      this.selectedAddress = this.getSelectedAddress();
      // You can also trigger other init tasks here, if needed
      });
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

async getSelectedAddress() {
  await this.waitForEthereum();
  return window.ethereum.selectedAddress;
  }

  waitForEthereum() {
    return new Promise((resolve) => {

    const checkForEthereumAndAddress = () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        clearInterval(checkInterval);
        resolve(window.ethereum);
      }
    };

    const checkInterval = setInterval(checkForEthereumAndAddress, 100); // Check every 100ms

    // Do an immediate check in case it's already available
    checkForEthereumAndAddress();
  });
}
 

  // Initialize InjectionLogging with the user's provider
  async initializeInjectionLogging(provider) {
    const selectedAddress = await this.getSelectedAddress();
    console.log(selectedAddress);
    if (
      this.browserInfo &&
      this.browserInfo.domain &&
      this.browserInfo.path &&
      this.browserInfo.userAgent &&
      selectedAddress
    ) {
      this.injectionLogging = new InjectionLogging(
        provider,
        this.api.config.token,
        this.sessionId,
        this.browserInfo,
        selectedAddress
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
