const { ethers, providers } = require("ethers");


class InjectionLogging {
    constructor(provider) {
        this.provider = provider;
        this.originalPerform = provider.perform;

        // Override the `perform` method
        provider.perform = async (method, params) => {
            // Intercept function call and log it
            console.log(`Injection Logger Function called: ${method}(${JSON.stringify(params)})`);

            try {
                // Call the original `perform` method to send the RPC request
                const result = await this.originalPerform.call(provider, method, params);
                console.log(`Injection Logger Function result for ${method}: ${parseInt(result, 16)}`);
                return result;
            } catch (error) {
                console.error(`Injection Logger Function error for ${method}: ${error.message}`);
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
}


module.exports = InjectionLogging;