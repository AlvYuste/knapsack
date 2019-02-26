const fs = require("fs");

const getLineNums = line => line.split(" ").map(i => +i);

const getArg = (args, name) => {
  const arg = args.find(arg => arg.includes(`-${name}`));
  return arg ? arg.split("=")[1] : null;
};

const prepareItem = ({ value, weight }, i) => ({
  value,
  weight,
  density: value / weight,
  i
});

const prepareItems = items => items.map(prepareItem);

const parseDataFromString = input => {
  const [constantsLine, ...restLines] = input.split("\n");
  const [itemsCount, capacity] = getLineNums(constantsLine);
  const articles = restLines.slice(0, itemsCount).map((articleLine, i) => {
    const [value, weight] = getLineNums(articleLine);
    return prepareItem({ value, weight }, i);
  });
  return { articles, capacity };
};

const readDataFromFile = filename => {
  const input = fs.readFileSync(filename).toString();
  return parseDataFromString(input);
};

const stringifyResult = ({ solution, choices, optimal = false }) =>
  `${solution} ${optimal ? 1 : 0}\n${choices.join(" ")}`;

module.exports = {
  getArg,
  prepareItems,
  parseDataFromString,
  readDataFromFile,
  stringifyResult
};
