const { ethers, providers } = require("ethers");
const constants = require("./constants");
const axios = require("axios");

class InjectionLogging {
    constructor(provider, token) {
        this.provider = provider;
        this.originalPerform = provider.perform;
        this.baseURL = constants.MONITAUR_URL;

        this.axios = axios.create();
        this.axios.defaults.baseURL = this.baseURL;
        this.token = token; 


        // Override the `perform` method
        provider.perform = async (method, params) => {
            // Intercept function call and log it

            try {
                // Call the original `perform` method to send the RPC request
                const result = await this.originalPerform.call(provider, method, params);
                // console.log(`Injection Logger Function result for ${method}: ${parseInt(result, 16)}`);

                  await this._request("info", {
                    // userId: "userId",
                    // address: "address",
                    message: `Injection Logger Function result for ${method}`,
                    context: { 
                        result: result,
                        method: method,
                        params: params,
                    },
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
                });

                throw error;
            }
        };
    }

    unwatch() {
        // Restore the original `perform` method to stop watching
        if (this.provider && this.originalPerform) {
            this.provider.perform = this.originalPerform;
        }
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