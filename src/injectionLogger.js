const { ethers, providers } = require("ethers");
const constants = require("./constants");
const axios = require("axios");

class InjectionLogging {
  constructor(provider, token, sessionId, browserInfo, selectedAddress) {
    this.provider = provider;
    this.originalPerform = provider.perform;
    this.baseURL = constants.MONITAUR_URL;

    this.axios = axios.create();
    this.axios.defaults.baseURL = this.baseURL;
    this.token = token;
    this.sessionId = sessionId;
    this.browserInfo = browserInfo,
    this.selectedAddress = selectedAddress;
    // Override the `perform` method
    provider.perform = async (method, params) => {
      // Intercept function call and log it
      const decodedMethod = this.decodeMethod(method);

    //   console.log("provider perform", decodedMethod.name, decodedMethod.args);
    //   console.log("provider perform", method, params, this.browserInfo, typeof this.selectedAddress);

      try {
        // Call the original `perform` method to send the RPC request
        const result = await this.originalPerform.call(
          provider,
          method,
          params
        );

        const body = {
          // userId: "userId",
          address: this.selectedAddress,
          message: `Injection Logger Function result for ${method}`,
          context: {
            result: result,
            method: method,
            params: params,
          },
          sessionId: this.sessionId,
          browserInfo: this.browserInfo,
        };
        console.log("body", body);
        await this._request("info", body);

        return result;
      } catch (error) {
        await this._request("error", {
          // userId: "userId",
          address: this.selectedAddress,
          message: `Error calling ${method}`,
          context: {
            error: error,
            method: method,
            params: params,
          },
          sessionId: this.sessionId,
          browserInfo: this.browserInfo,
        });

        throw error;
      }
    };
  }

  // Decode the method call to get the function name and arguments
  decodeMethod(method) {
    console.log("all method calls", method);
    const parts = method.split(" ");
    const name = parts[0];
    const args = parts.slice(1);

    return {
      name: name,
      args: args,
    };
  }

  async _request(level, data) {
    if (
      !this.browserInfo ||
      !this.browserInfo.domain ||
      !this.browserInfo.path ||
      !this.browserInfo.userAgent
    ) {
      console.error("Browser info is missing. Log request aborted.");
      return;
    }
 
    const response = await this.axios.post("/create-event", {
      logLevel: level,
      ...data,
      token: this.token,
    });

    return response.data;
  }
}

module.exports = InjectionLogging;
