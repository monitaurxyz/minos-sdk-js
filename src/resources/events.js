class Events {
  constructor(config) {
    this.api = config.axios;
    this.workspaceId = config.config.workspaceId;
  }

  async create(name, userId, address = null, logLevel = "success", message = null, context = {}) {
    // We can validate the event here before even sending it, to avoid unnecessary requests.

    if (!name || typeof name !== "string") {
      throw new Error("Please provide a valid String for the name.");
    }

    if (!userId || typeof userId !== "string") {
      throw new Error("Please provide a valid String for the userId.");
    }

    const response = await this.api.post("/create-event", {
      name: name,
      userId: userId,
      address: address,
      logLevel: logLevel,
      message: message,
      context: context,
      workspaceId: this.workspaceId,
    });
    return response.data;
  }
}

module.exports = Events;
