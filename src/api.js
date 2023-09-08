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

  async fatal(message = null, context = {}, userId = null, address = null) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    return await this._request("fatal", {
      userId: userId,
      address: address,
      message: message,
      context: context,
    });
  }

  async warn(message = null, context = {}, userId = null, address = null) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    return await this._request("warn", {
      userId: userId,
      address: address,
      message: message,
      context: context,
    });
  }

  async error(message = null, context = {}, userId = null, address = null) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    return await this._request("error", {
      userId: userId,
      address: address,
      message: message,
      context: context,
    });
  }

  async info(message = null, context = {}, userId = null, address = null) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    return await this._request("info", {
      userId: userId,
      address: address,
      message: message,
      context: context,
    });
  }

  async debug(message = null, context = {}, userId = null, address = null) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    return await this._request("debug", {
      userId: userId,
      address: address,
      message: message,
      context: context,
    });
  }

  async trace(message = null, context = {}, userId = null, address = null) {
    // We can validate the event here before even sending it, to avoid unnecessary requests

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
