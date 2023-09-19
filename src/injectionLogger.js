const { ethers, providers } = require("ethers");
const constants = require("./constants");
const axios = require("axios");

class InjectionLogging {
  constructor(provider, token, sessionId) {
    this.provider = provider;
    this.originalPerform = provider.perform;
    this.baseURL = constants.MONITAUR_URL;

    this.axios = axios.create();
    this.axios.defaults.baseURL = this.baseURL;
    this.token = token;
    this.sessionId = sessionId;

    // Override the `perform` method
    provider.perform = async (method, params) => {
      // Intercept function call and log it

      console.log("provider perform", method, params);
      try {
        // Call the original `perform` method to send the RPC request
        const result = await this.originalPerform.call(
          provider,
          method,
          params
        );

        await this._request("info", {
          // userId: "userId",
          // address: "address",
          message: `Injection Logger Function result for ${method}`,
          context: {
            result: result,
            method: method,
            params: params,
          },
          sessionId: this.sessionId,
        });

        return result;
      } catch (error) {
        await this._request("error", {
          // userId: "userId",
          // address: "address",
          message: `Error calling ${method}`,
          context: {
            error: error,
            method: method,
            params: params,
          },
          sessionId: this.sessionId,
        });

        throw error;
      }
    };
  }

  async _request(level, data) {
    const response = await this.axios.post("/create-event", {
      logLevel: level,
      ...data,
      token: this.token,
    });

    return response.data;
  }
}

module.exports = InjectionLogging;
