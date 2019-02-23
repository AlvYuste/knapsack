const fs = require("fs");

const getArg = name =>
  process.argv.find(arg => arg.includes(`-${name}`)).split("=")[1];

const getLineNums = line => line.split(" ").map(i => +i);

const solve = (articles, capacity) => {
  /**
   * THE MAIN SOLVE CODE GOES HERE
   */
};

const main = async () => {
  const sourceFile = getArg("file");
  const input = fs.readFileSync(sourceFile).toString();
  const [constantsLine, ...restLines] = input.split("\r\n");
  const [itemsCount, capacity] = getLineNums(constantsLine);
  const articles = restLines.slice(0, itemsCount).map(articleLine => {
    const [value, weight] = getLineNums(articleLine);
    return { value, weight, taken: 0 };
  });
  return solve(articles, capacity);
};

(async () => {
  process.stdout.write(await main());
})();
