const ethers = require("ethers");
const constants = require("./constants");
const axios = require("axios");

class Ethers {
  constructor(token) {
    this.token = token;
    this.provider = null;

    this.axios = axios.create();
    this.axios.defaults.baseURL = constants.MONITAUR_URL;
  }

  init(rpcUrl) {
    // Perform Ethers package initialization here using this.apiKey
    if (this.provider) {
      console.log("Ethers package is already initialized.");
      return;
    }

    console.log("Initializing Ethers package...");

    console.log("Token:", this.token);

    if (!rpcUrl || typeof rpcUrl !== "string") {
      throw new Error("Please provide a valid String for the rpcUrl.");
    }

    try {
      this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);

      console.log("Ethers package initialized successfully.");
    } catch (err) {
      console.error("Failed to initialize Ethers package:", err.message);
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

  async getBalance(address, options) {
    try {
      if (!this.provider) {
        throw new Error("Ethers package is not initialized. Call init() first.");
      }

      const balance = await this.provider.getBalance(address);
      // return ethers.utils.formatEther(balance); // Convert the balance from Wei to Ether

      let context = {
        balance: ethers.utils.formatEther(balance),
        rawBalance: balance.toString(),
        address: address,
        timestamp: Date.now(),
      };

      if (options.context) {
        context = {
          ...context,
          ...options.context,
        };
      }

      console.log("Context:", context);

      await this._request("info", {
        userId: address,
        address: address,
        message: "Balance retrieved successfully.",
        context: context,
      });

      console.log("Balance retrieved successfully:", balance.toString());

      return balance;
    } catch (err) {
      console.error("Error getting balance:", err.message);
      throw err;
    }
  }

  async getTransaction(hash) {
    try {
      if (!this.provider) {
        throw new Error("Ethers package is not initialized. Call init() first.");
      }

      const txn = await this.provider.getTransaction(hash);
      // return ethers.utils.formatEther(balance); // Convert the balance from Wei to Ether

      await this._request("info", {
        userId: hash,
        address: hash,
        message: "Transaction retrieved successfully.",
        context: {
          transaction: txn,
          timestamp: Date.now(),
        },
      });

      console.log("Transaction retrieved successfully:", txn);

      return txn;
    } catch (err) {
      console.error("Error getting balance:", err.message);
      throw err;
    }
  }

  async getTransactionCount(address) {
    try {
      if (!this.provider) {
        throw new Error("Ethers package is not initialized. Call init() first.");
      }

      const txnCount = await this.provider.getTransactionCount(address);
      // return ethers.utils.formatEther(balance); // Convert the balance from Wei to Ether

      await this._request("info", {
        userId: this.token,
        address: address,
        message: "Transaction acount retrieved.",
        context: {
          count: txnCount,
          address: address,
          timestamp: Date.now(),
        },
      });

      console.log("Txn Count:", txnCount);

      return txnCount;
    } catch (err) {
      console.error("Error getting balance:", err.message);
      throw err;
    }
  }

  // async fatal(userId, address = null, message = null, context = {}) {
  //   // We can validate the event here before even sending it, to avoid unnecessary requests.

  //   if (!userId || typeof userId !== "string") {
  //     throw new Error("Please provide a valid String for the userId.");
  //   }

  //   const response = await this.api.post("/create-event", {
  //     userId: userId,
  //     address: address,
  //     logLevel: "fatal",
  //     message: message,
  //     context: context,
  //     token: this.token,
  //   });
  //   return response.data;
  // }
}

module.exports = Ethers;
