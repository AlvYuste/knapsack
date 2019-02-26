const fillUntilFull = (articles, capacity) => {
  const choices = Array(articles.length).fill(0);
  const result = { weight: 0, value: 0 };
  articles.forEach(({ weight, value, i }) => {
    if (result.weight + weight <= capacity) {
      choices[i] = 1;
      result.value += value;
      result.weight += weight;
    }
  });
  return { solution: result.value, choices, optimal: false };
};
const quantityGreedy = (articles, capacity) => {
  const sortedArt = articles.sort((a, b) => a.weight >= b.weight);
  return fillUntilFull(sortedArt, capacity);
};

const valuableGreedy = (articles, capacity) => {
  const sortedArt = articles.sort((a, b) => a.value <= b.value);
  return fillUntilFull(sortedArt, capacity);
};

const densityGreedy = (articles, capacity) => {
  const sortedArt = articles.sort((a, b) => a.density <= b.density);
  return fillUntilFull(sortedArt, capacity);
};

module.exports = {
  quantityGreedy,
  valuableGreedy,
  densityGreedy
};
