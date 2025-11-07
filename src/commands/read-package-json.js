const { readFileSync } = require("node:fs");

function readPackageJson() {
  const file = readFileSync("package.json", "utf8");

  const packageJson = JSON.parse(file);

  return Object.keys(packageJson.scripts);
}

module.exports = {
  readPackageJson,
};
