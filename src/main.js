#!/usr/bin/env node

// Grab the words typed so far (Zsh passes them as args)
const { getDefaultCommands, readPackageJson } = require("./commands");
const { joinArgs } = require("./utils");
const { NEWLINE, DASH } = require("./utils/const");

const args = process.argv
  .slice(2)
  .map((arg) => arg.trim())
  .filter((arg) => arg.length > 0 && !arg.includes(DASH));

let suggestions = [];

if (joinArgs(args).startsWith("npm run")) {
  suggestions = readPackageJson();
} else {
  suggestions = getDefaultCommands(args);
}

// Output suggestions, one per line
console.log(suggestions.join(NEWLINE));
