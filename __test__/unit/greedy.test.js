const io = require("../../src/io");
const {
  densityGreedy,
  quantityGreedy,
  valuableGreedy
} = require("../../src/greedy");

const articles = io.prepareItems([
  { weight: 2, value: 1 },
  { weight: 2, value: 1 },
  { weight: 2, value: 1 },
  { weight: 5, value: 10 },
  { weight: 5, value: 10 },
  { weight: 8, value: 13 },
  { weight: 3, value: 7 }
]);
const capacity = 10;

test("Quantity greedy algorith works as expected", () =>
  expect(quantityGreedy(articles, capacity).solution).toEqual(10));
test("Valuable greedy algorith works as expected", () =>
  expect(valuableGreedy(articles, capacity).solution).toEqual(14));
test("Density greedy algorith works as expected", () =>
  expect(densityGreedy(articles, capacity).solution).toEqual(18));
