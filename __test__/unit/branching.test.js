const { prepareItems } = require("../../src/io");
const { deppFirst } = require("../../src/branching");
const {
  linearRelaxation,
  capacityRelaxation
} = require("../../src/relaxations");

const articles = prepareItems([
  { weight: 5, value: 45 },
  { weight: 8, value: 48 },
  { weight: 3, value: 35 }
]);
const capacity = 10;

test("Deep first with capacity relaxation works as expected", () => {
  const mockFn = jest.fn(capacityRelaxation);
  const { solution, choices, optimal } = deppFirst(mockFn)(articles, capacity);
  expect(solution).toEqual(80);
  expect(choices).toEqual([1, 0, 1]);
  expect(optimal).toBeTruthy();
  expect(mockFn).toBeCalledTimes(6);
});
test("Deep first with linear relaxation works as expected", () => {
  const mockFn = jest.fn(linearRelaxation);
  const { solution, choices, optimal } = deppFirst(mockFn)(articles, capacity);
  expect(solution).toEqual(80);
  expect(choices).toEqual([1, 0, 1]);
  expect(optimal).toBeTruthy();
  expect(mockFn).toBeCalledTimes(4);
});
