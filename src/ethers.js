const ethers = require("ethers");
const constants = require("./constants");
const axios = require("axios");

class Ethers {
  constructor(token) {
    this.token = token;
    this.provider = null;
    this.utils = ethers.utils;

    this.axios = axios.create();
    this.axios.defaults.baseURL = constants.MONITAUR_URL;
  }

  async _request(level, data) {
    const response = await this.axios.post("/create-event", {
      logLevel: level,
      ...data,
      token: this.token,
    });
    return response.data;
  }

  async init(rpcUrl) {
    // Perform Ethers package initialization here using this.apiKey
    if (this.provider) {
      console.log("Ethers package is already initialized.");
      return;
    }

    if (!rpcUrl || typeof rpcUrl !== "string") {
      throw new Error("Please provide a valid String for the rpcUrl.");
    }

    try {
      const self = this;

      const includedMethods = [
        "getBalance",
        "getTransactionCount",
        "getBlockNumber",
        "getCode",
        "getStorageAt",
        "getBlock",
        "getBlockWithTransactions",
        "getAvatar",
        "getResolver",
        "lookupAddress",
        "resolveName",
        "getLogs",
        // "getNetwork",
        "getBlockNumber",
        "getGasPrice",
        "getFeeData",
        "ready",
        "call",
        "estimateGas",
        "getTransaction",
        "getTransactionReceipt",
        "sendTransaction",
        "waitForTransaction",
        "isProvider",
      ];

      this.provider = new Proxy(new ethers.providers.JsonRpcProvider(rpcUrl), {
        get: (target, prop, receiver) => {
          const originalMethod = target[prop];

          if (typeof originalMethod === "function" && includedMethods.find((x) => x === prop)) {
            console.log("Called method:", prop);

            return async function (...args) {
              let context;

              let argsCopy = [...args];

              if (argsCopy.length > 0 && typeof argsCopy[argsCopy.length - 1] === "object") {
                let last = argsCopy[argsCopy.length - 1];

                if (last.context) {
                  context = argsCopy.pop(); // Get the context object from the arguments
                  argsCopy.slice(0, argsCopy.length - 1);
                } else {
                  context = {};
                }
              } else {
                context = {}; // Create an empty context object if no context provided
              }

              if (argsCopy.length > 0) context.args = argsCopy;

              const result = await originalMethod.apply(this, argsCopy);

              context = {
                ...context,
                result: result,
              };

              self._request("info", {
                message: `Calling method ${prop}`,
                context,
              });

              return result;
            };
          }

          // If the property is not a function, return the property value directly
          return originalMethod;
        },
      });
      console.log("Ethers package initialized successfully.");
    } catch (err) {
      console.error("Failed to initialize Ethers package:", err.message);
    }
  }
}

module.exports = Ethers;
