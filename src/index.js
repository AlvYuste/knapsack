const io = require("./io");
const { densityGreedy } = require("./greedy");

const solve = (articles, capacity) => {
  return densityGreedy(articles, capacity);
};

const main = async args => {
  const fileName = io.getArg(args, "file");
  const { articles, capacity } = io.readDataFromFile(fileName);
  const result = solve(articles, capacity);
  return io.stringifyResult(result);
};

module.exports = { main };
