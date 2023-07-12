"use strict";

const isBrowser = () => {
  return typeof window !== "undefined" && {}.toString.call(window) === "[object Window]";
};

const isNode = () => {
  return typeof global !== "undefined" && {}.toString.call(global) === "[object global]";
};

export default {
  isBrowser,
  isNode,
};
