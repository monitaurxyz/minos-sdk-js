class Events {
  constructor(config) {
    this.api = config.axios;
    this.token = config.config.token;
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

  async warn(userId, address = null, message = null, context = {}) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    if (!userId || typeof userId !== "string") {
      throw new Error("Please provide a valid String for the userId.");
    }

    const response = await this.api.post("/create-event", {
      userId: userId,
      address: address,
      logLevel: "warn",
      message: message,
      context: context,
      token: this.token,
    });
    return response.data;
  }

  async error(userId, address = null, message = null, context = {}) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    if (!userId || typeof userId !== "string") {
      throw new Error("Please provide a valid String for the userId.");
    }

    const response = await this.api.post("/create-event", {
      userId: userId,
      address: address,
      logLevel: "error",
      message: message,
      context: context,
      token: this.token,
    });
    return response.data;
  }

  async info(userId, address = null, message = null, context = {}) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    if (!userId || typeof userId !== "string") {
      throw new Error("Please provide a valid String for the userId.");
    }

    const response = await this.api.post("/create-event", {
      userId: userId,
      address: address,
      logLevel: "info",
      message: message,
      context: context,
      token: this.token,
    });
    return response.data;
  }

  async debug(userId, address = null, message = null, context = {}) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    if (!userId || typeof userId !== "string") {
      throw new Error("Please provide a valid String for the userId.");
    }

    const response = await this.api.post("/create-event", {
      userId: userId,
      address: address,
      logLevel: "debug",
      message: message,
      context: context,
      token: this.token,
    });
    return response.data;
  }

  /**
   *
   * @param {*} userId
   * @param {*} address
   * @param {*} message
   * @param {*} context
   * @returns
   */
  async trace(userId, address = null, message = null, context = {}) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    if (!userId || typeof userId !== "string") {
      throw new Error("Please provide a valid String for the userId.");
    }

    const response = await this.api.post("/create-event", {
      userId: userId,
      address: address,
      logLevel: "trace",
      message: message,
      context: context,
      token: this.token,
    });
    return response.data;
  }
}

module.exports = Events;
