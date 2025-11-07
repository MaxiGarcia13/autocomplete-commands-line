const filterArgsImports = require("./filter-args");
const joinArgsImports = require("./join-args");
const getLastCommandImports = require("./get-last-command");

module.exports = {
  ...filterArgsImports,
  ...joinArgsImports,
  ...getLastCommandImports,
};
