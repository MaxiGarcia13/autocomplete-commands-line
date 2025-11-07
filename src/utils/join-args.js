const { SPACE } = require("./const");

function joinArgs(args) {
  return args.join(SPACE).trim();
}

module.exports = { joinArgs };
