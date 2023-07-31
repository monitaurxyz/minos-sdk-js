const constants = require("./constants");
const enableResources = require("./resources");
const axios = require("axios");
const ethers = require("ethers");

class API {
  constructor(token) {
    this.baseURL = constants.MONITAUR_URL;

    this.axios = axios.create();
    this.axios.defaults.baseURL = this.baseURL;

    if (!token || typeof token !== "string") throw new SDKError(500, "Minos: No token was found, please pass one when initializing Minos.");

    this.config = {
      token: token,
    };
  }

  async ethers(rpcUrl) {
    const proxyHandler = {
      get: function (target, property, receiver) {
        if (typeof target[property] === "function") {
          return function (...args) {
            try {
              // Intercept the function call and handle it with custom logic
              console.log(`Calling ${property} with arguments:`, args);
              const result = target[property].apply(target, args);
              console.log(`Result of ${property}:`, result);
              return result;
            } catch (error) {
              // Handle any errors that might occur
              console.error(`Error in ${property}:`, error);
              throw error;
            }
          };
        } else {
          // If the property is not a function, return the property directly
          return target[property];
        }
      },
    };

    const minosEthers = new Proxy(ethers.ethers, proxyHandler);

    // now lets instaniate the ethers provider
    const instantiatedProvider = new minosEthers.providers.JsonRpcProvider(rpcUrl);

    return instantiatedProvider;
  }

  async fatal(userId, address = null, message = null, context = {}) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    if (!userId || typeof userId !== "string") {
      throw new Error("Please provide a valid String for the userId.");
    }

    return await this._request("fatal", {
      userId: userId,
      address: address,
      message: message,
      context: context,
    });
  }

  async warn(userId, address = null, message = null, context = {}) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    if (!userId || typeof userId !== "string") {
      throw new Error("Please provide a valid String for the userId.");
    }

    return await this._request("warn", {
      userId: userId,
      address: address,
      message: message,
      context: context,
    });
  }

  async error(userId, address = null, message = null, context = {}) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    if (!userId || typeof userId !== "string") {
      throw new Error("Please provide a valid String for the userId.");
    }

    return await this._request("error", {
      userId: userId,
      address: address,
      message: message,
      context: context,
    });
  }

  async info(userId, address = null, message = null, context = {}) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    if (!userId || typeof userId !== "string") {
      throw new Error("Please provide a valid String for the userId.");
    }

    return await this._request("info", {
      userId: userId,
      address: address,
      message: message,
      context: context,
    });
  }

  async debug(userId, address = null, message = null, context = {}) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    if (!userId || typeof userId !== "string") {
      throw new Error("Please provide a valid String for the userId.");
    }

    return await this._request("debug", {
      userId: userId,
      address: address,
      message: message,
      context: context,
    });
  }

  async trace(userId, address = null, message = null, context = {}) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    if (!userId || typeof userId !== "string") {
      throw new Error("Please provide a valid String for the userId.");
    }

    return await this._request("trace", {
      userId: userId,
      address: address,
      message: message,
      context: context,
    });
  }

  async _request(level, data) {
    const response = await this.axios.post("/create-event", {
      logLevel: level,
      ...data,
      token: this.config.token,
    });
    return response.data;
  }
}

// write me another class where I don't need an Init

module.exports = API;
