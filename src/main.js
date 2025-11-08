const { getDefaultCommands, readPackageJson } = require("./commands");
const { NEWLINE, BACKSLASH, EMPTY, SPACE } = require("./utils/const");

const args = process.env.COMP_LINE.toString()
  .trim()
  .replaceAll(BACKSLASH, EMPTY);

let suggestions = [];

if (args.startsWith("npm run")) {
  suggestions = readPackageJson();
} else {
  suggestions = getDefaultCommands(args.split(SPACE));
}

// Output suggestions, one per line
console.log(suggestions.join(NEWLINE));
