class InjectionLogging {
  constructor() {
    this.providers = {}; // Store custom providers
  }

  injectLogging(provider, options) {
    const { functionsToIntercept } = options;

    // Create a custom provider inheriting from the original provider
    const CustomProvider = class extends provider.constructor {
      constructor(...args) {
        super(...args);
        this.injectInterceptors();
      }

      injectInterceptors() {
        functionsToIntercept.forEach((funcName) => {
          const originalFunction = this[funcName];

          this[funcName] = async function (...args) {
            // Custom logic before the original function call
            console.log(`Intercepted function: ${funcName}`);
            const result = await originalFunction.apply(this, args);
            // Custom logic after the original function call
            return result;
          };
        });
      }
    };

    console.log(provider);

    return new CustomProvider(provider.connection.url, provider._network.chainId);
  }

  init(provider, options) {
    const customProvider = this.injectLogging(provider, options);
    return customProvider;
  }
}

module.exports = InjectionLogging;
