const { readFileSync } = require("node:fs");

function readPackageJson() {
  try {
    const file = readFileSync("package.json", { encoding: "utf8" });
    const packageJson = JSON.parse(file);

    return Object.keys(packageJson.scripts);
  } catch {
    return [];
  }
}

module.exports = {
  readPackageJson,
};
