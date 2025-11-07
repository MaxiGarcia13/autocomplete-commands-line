const { DASH, AMPERSAND } = require("./const");

function filterArgs(args) {
  const result = args.filter(
    (arg) => !!arg && !arg.startsWith(DASH) && arg !== AMPERSAND,
  );

  return result;
}

module.exports = {
  filterArgs,
};
