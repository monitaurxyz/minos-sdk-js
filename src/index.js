

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

    // Initialize selectedAddress with the user's wallet address
    (async () => {
      this.selectedAddress = await this.getSelectedAddress();
  })();
  }
    
    captureBrowserInfo() {
        if (typeof window !== 'undefined') { // We want to ensure window object is available
          const domain = window.location.hostname;
          const path = window.location.pathname;
          const userAgent = window.navigator.userAgent;

          // console.log("Captured Browser Info:", { domain, path, userAgent }); // Log the captured info
    
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
  // We want to ensure window object is available before we set the selectedAddress
  try {
    await this.waitForEthereum();
    if (!window.ethereum || typeof window.ethereum.selectedAddress === 'undefined') {
      // Handle the absence of ethereum or selectedAddress
      throw new Error('Ethereum provider not available or no address selected.');
    }

    return window.ethereum.selectedAddress;
  } catch (error) {
    console.error('Error fetching selected address:', error);
    throw error; // or return some fallback or default value if appropriate
  }
  }

  // Helper function to wait for the Ethereum provider to be available
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

  logSessionData(level, message, context, userId) {
    const sessionId = this.sessionId;
    const browserInfo = this.browserInfo;
    const address = this.selectedAddress;
    this.api[level](message, context, userId, address, sessionId, browserInfo);
  } 

  fatal(message, context, userId) {
    return this.logSessionData("fatal", message, context, userId, this.selectedAddress, this.sessionId, this.browserInfo);
  }

  warn(message, context, userId) {
    return this.logSessionData("warn", message, context, userId, this.selectedAddress, this.sessionId, this.browserInfo);
  }

  error(message, context, userId) {
    return this.logSessionData("earn", message, context, userId, this.selectedAddress, this.sessionId, this.browserInfo);
  }

  info(message, context, userId) {
    return this.logSessionData("info", message, context, userId, this.selectedAddress, this.sessionId, this.browserInfo);
  }

  debug(message, context, userId) {
    return this.logSessionData("debug", message, context, userId, this.selectedAddress, this.sessionId, this.browserInfo);
  }

  trace(message, context, userId) {
    return this.logSessionData("trace", message, context, userId, this.selectedAddress, this.sessionId, this.browserInfo);
  }
}

module.exports = Minos;
