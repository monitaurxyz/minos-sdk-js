# Minos SDK for Monitaur
Welcome to Minos, the SDK for Monitaur, a Web3 monitoring and Application Performance Monitoring (APM) platform. Minos provides a simple and efficient way to monitor your appliations end-to-end, allowing you to monitor and analyze the performance of your Web3 on and off-chain.

## Installation
To use Minos, follow these steps:

1) Install Minos using your preferred package manager:

```bash
npm install @minos/sdk-js
```

or

```bash
yarn add @minos/sdk-js
```

2) Import the Minos module in your application:

```javascript
const Minos = require('@minos/sdk-js');
```

3) Initialize Minos with your Monitaur Minos Source Token:

```javascript
const minos = new Minos('MINOS_SOURCE_TOKEN');
```

4) Start monitoring your Web3 application by using Minos' APIs and functions.

There are six levels you can create an event for:

`fatal`, `warn`, `error`, `info`, `debug`, and `trace`

```javascript
minos.events.fatal({
  name: "Your App Name", // required
  userId: "440e0a20-cd48-4cac-b292-25889f4eaf3a", // required
  address: "0x354c818ca8b9251b393131c23a736a67ccb19297", // defaults to null
  message: "Any message you want to share here for top level context", // optional
  context: {
    message: "Add context that helps your team",
    // You can add whatever you'd like here
  },
});
```


## Getting Help
If you encounter any issues, have questions, or would like to provide feedback, please reach out to our support team at support@monitaur.xyz. You can also visit our knowledge base for additional resources and guides.

## Authors

- [@foundercasey](https://github.com/FounderCasey)