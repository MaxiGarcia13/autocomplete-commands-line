const readPackageJsonImports = require("./read-package-json");
const defaultImports = require("./default");

module.exports = {
  ...readPackageJsonImports,
  ...defaultImports,
};
