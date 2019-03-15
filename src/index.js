const io = require("./io");
const { deepFirst, bestFirst } = require("./branching");
const { linearRelaxation, capacityRelaxation } = require("./relaxations");

const solve = (articles, capacity) => {
  return bestFirst(linearRelaxation)(articles, capacity);
};

const main = async args => {
  const fileName = io.getArg(args, "file");
  const { articles, capacity } = io.readDataFromFile(fileName);
  const result = solve(articles, capacity);
  return io.stringifyResult(result);
};

module.exports = { main };
