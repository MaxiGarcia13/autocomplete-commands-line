const { execSync } = require("node:child_process");
const { joinArgs, filterArgs, getLastCommand } = require("../utils");

function getDefaultCommands(args) {
  if (args.length === 0) {
    return [];
  }

  const filteredArgs = getLastCommand(filterArgs(args));

  const output = execSyncCommand(filteredArgs);

  const options = getOptions(output);
  const commands = getSubCommands(output);

  return [...commands, ...options];
}

function execSyncCommand(args) {
  const help = ["--help", "-h", "help"];

  let output = "";
  const command = joinArgs(args);

  for (const flag of help) {
    try {
      output = execSync(`${command} ${flag}`, {
        encoding: "utf8",
        stdio: "pipe",
      });
    } catch {
      continue;
    }
  }

  if (output.length === 0 && args.length > 1) {
    return execSyncCommand(args.slice(0, args.length - 1));
  }

  return output;
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
