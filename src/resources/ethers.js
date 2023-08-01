const ethers = require("ethers");

class Ethers {
  constructor(config) {
    this.api = config.axios;
    this.token = config.config.token;
    this.rpcUrl = config.config.rpcUrl;
  }

  let ethers = new ethers

  async getBalance(address) {
    const balance = await this.api.get(`/balance/${address}`);
    return balance.data;
  }

  async fatal(userId, address = null, message = null, context = {}) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    if (!userId || typeof userId !== "string") {
      throw new Error("Please provide a valid String for the userId.");
    }

    const response = await this.api.post("/create-event", {
      userId: userId,
      address: address,
      logLevel: "fatal",
      message: message,
      context: context,
      token: this.token,
    });
    return response.data;
  }
}

module.exports = Events;
