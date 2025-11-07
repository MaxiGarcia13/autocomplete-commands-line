#!/usr/bin/env node

const { execSync } = require("node:child_process");
const { joinArgs, filterArgs, getLastCommand } = require("../utils");

function getDefaultCommands(args) {
  try {
    return executeCommand(args);
  } catch {
    return executeCommand(args.slice(0, args.length - 1));
  }
}

function executeCommand(args) {
  if (args.length === 0) {
    return [];
  }

  const filteredArgs = joinArgs(getLastCommand(filterArgs(args)));

  const output = execSync(filteredArgs + " --help", {
    encoding: "utf8",
    stdio: "pipe",
  });

  const options = getOptions(output);
  const commands = getCommands(output);

  const result = [...commands, ...options];

  if (result.length === 0) {
    const lastCommand = args.pop();

    return executeCommand(args.slice(0, args.length - 1)).filter((command) =>
      command.includes(lastCommand),
    );
  }

  return result;
}

function getOptions(output) {
  return Array.from(output.matchAll(/(^|\s)(--?\w[\w-]*)/g)).map(
    (match) => match[2],
  );
}

function getCommands(output) {
  return Array.from(output.matchAll(/^\s{2,}([a-z0-9-]+)\s{2,}/gm)).map(
    (command) => command[1],
  );
}

module.exports = {
  getDefaultCommands,
};
