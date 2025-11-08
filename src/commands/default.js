#!/usr/bin/env node

const { execSync } = require("node:child_process");
const { joinArgs, filterArgs, getLastCommand } = require("../utils");

function getDefaultCommands(args) {
  return getSubCommandsAndOptions(args);
}

function execSyncCommand(command) {
  const exec = (cmd) =>
    execSync(cmd, {
      encoding: "utf8",
      stdio: "pipe",
    });

  try {
    if (exec(command + " --help 2>/dev/null")) {
      return exec(command + " --help");
    }

    if (exec(command + " -h 2>/dev/null")) {
      return exec(command + " -h");
    }

    if (exec(command + " help 2>/dev/null")) {
      return exec(command + " help");
    }
  } catch (error) {
    return (
      error.output?.toString() ||
      error.stdout?.toString() ||
      error.stderr?.toString() ||
      []
    );
  }

  return [];
}

function getSubCommandsAndOptions(args) {
  if (args.length === 0) {
    return [];
  }

  const filteredArgs = joinArgs(getLastCommand(filterArgs(args)));

  const output = execSyncCommand(filteredArgs);

  const options = getOptions(output);
  const commands = getSubCommands(output);

  const result = [...commands, ...options];

  if (result.length === 0) {
    const lastCommand = args.pop();

    return getSubCommandsAndOptions(args.slice(0, args.length - 1)).filter(
      (command) => command.includes(lastCommand),
    );
  }

  return result;
}

function getOptions(output) {
  return Array.from(output.matchAll(/(^|\s)(--?\w[\w-]*)/g)).map(
    (match) => match[2],
  );
}

function getSubCommands(output) {
  const firtTryToGetCommands = Array.from(
    output.matchAll(/^\s{2,}([a-z0-9-]+)\s{2,}/gm),
  ).map((command) => command[1]);

  const secondTryToGetCommands = [
    ...output.matchAll(/\b\w[\w-]+(?=\s{2,}|,|\s*$)/g),
  ].map((command) => command[0]);

  return [...new Set([...firtTryToGetCommands, ...secondTryToGetCommands])];
}

module.exports = {
  getDefaultCommands,
};
