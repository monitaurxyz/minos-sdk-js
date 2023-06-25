const RESOURCES = {
  events: require("./events"),
};

module.exports = function enableResources(api, resources) {
  return resources.reduce((acc, resource) => {
    acc[resource] = new RESOURCES[resource](api);
    return acc;
  }, {});
};
