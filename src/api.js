const constants = require("./constants");
const enableResources = require("./resources");
const axios = require("axios");

class API {
  constructor(config) {
    this.config = { ...config };

    this.baseURL = constants.MONITAUR_URL;

    this.axios = axios.create();
    this.axios.defaults.baseURL = this.baseURL;
    const { token } = this.config;

    if (!token || typeof token !== "string") throw new SDKError(500, "Minos: No token was found, please pass one when initializing Minos.");
  }

  init() {
    const resources = enableResources(this, ["events"]);
    Object.assign(this, resources);
    return this;
  }
}

module.exports = API;
