// Was receiving following error message:
// Error: jest-haste-map: Haste module naming collision:   Duplicate module name amplify
// Added this file to avoid that error

const blacklist = require("metro-config/src/defaults/blacklist");

// blacklist is a function that takes an array of regexes and combines them with the default blacklist ot return a single regex.

module.exports = {
  resolver: {
    blacklistRE: blacklist([/backend\/.*/])
  }
};
