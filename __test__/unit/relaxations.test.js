const { prepareItems } = require("../../src/io");
const {
  capacityRelaxation,
  linearRelaxation
} = require("../../src/relaxations");

const articles = prepareItems([
  { weight: 5, value: 45 },
  { weight: 8, value: 48 },
  { weight: 3, value: 35 }
]);
const capacity = 10;

test("Capacity relaxation works as expected", () =>
  expect(capacityRelaxation(articles)).toEqual(128));

test("Linear relaxation works as expected", () =>
  expect(linearRelaxation(articles, capacity)).toEqual(92));
