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
