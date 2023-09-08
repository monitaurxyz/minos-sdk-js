# Minos SDK for Monitaur
Welcome to Minos, the SDK for Monitaur, a Web3 monitoring and Application Performance Monitoring (APM) platform. Minos provides a simple and efficient way to monitor your appliations end-to-end, allowing you to monitor and analyze the performance of your Web3 on and off-chain.

## Installation
To use Minos, follow these steps:

1) Install Minos using your preferred package manager:

```bash
npm install minos-sdk
```

or

```bash
yarn add minos-sdk
```

2) Import the Minos module in your application:

```javascript
const Minos = require('minos-sdk');
```

3) Initialize Minos with your Monitaur Minos Application Token:

```javascript
const minos = new Minos('MINOS_APPLICATION_TOKEN');
```

If you haven't created an Application yet, you can do so [here](https://app.monitaur.xyz/applications)

4) Start monitoring your Web3 application by using Minos' APIs and functions.

There are six levels you can create an event for:

`fatal`, `warn`, `error`, `info`, `debug`, and `trace`

```javascript
minos.fatal(
  "Any message you want to share here for top level context",
  {
    message: "Add context that helps your team",
    // This is the context object, you can add whatever you'd like here
  },
  "userId", // not required
  "address" // not required
  );
```

### Usage with Ethers.js
If you're using Ethers.js, we've built in custom injection logging that will create `info` and `error` events respectively. To do this the set up is really simple, you'll pass in the ethers provider that you created.

```javascript
minos.initializeInjectionLogging(yourEthersProvider);

// make your Ethers
await provider.getBlock()

```


## Getting Help
If you encounter any issues, have questions, or would like to provide feedback, please reach out to our support team at support@monitaur.xyz. You can also visit our knowledge base for additional resources and guides.

## Authors

- [@foundercasey](https://github.com/FounderCasey)
- [@NickGonzalez04](https://github.com/NickGonzalez04)
