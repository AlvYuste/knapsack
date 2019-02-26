const io = require("../../src/io");
const { dynamicRecursion, dynamicTable } = require("../../src/dynamic");

const articles = io.prepareItems([
  { weight: 4, value: 5 },
  { weight: 5, value: 6 },
  { weight: 2, value: 3 }
]);
const capacity = 9;

test("Dynamic programming recursive algorithm works as expected", () => {
  expect(dynamicRecursion(articles, capacity).solution).toEqual(11);
});
test("Dynamic programming table algorithm works as expected", () => {
  expect(dynamicTable(articles, capacity).solution).toEqual(11);
});
