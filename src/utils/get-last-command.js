const { AMPERSANDS } = require("./const");

function getLastCommand(args) {
  if (args.includes(AMPERSANDS)) {
    const lastAmpersandIndex = args.lastIndexOf(AMPERSANDS);

    return args.slice(lastAmpersandIndex + 1, args.length);
  }

  return args;
}

module.exports = { getLastCommand };
