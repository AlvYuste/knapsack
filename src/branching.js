const deepFirst = optimisticFn => (articles, capacity) => {
  const n = articles.length;
  let choices = Array(n).fill(0);
  let solution = 0;
  const branch = (x = [], capacityLeft = capacity, totalValue = 0) => {
    if (capacityLeft < 0) {
      return;
    }
    if (x.length >= n) {
      if (totalValue > solution) {
        solution = totalValue;
        choices = x;
      }
      return;
    }
    const i = x.length;
    const { value, weight } = articles[i];
    const articlesLeft = articles.slice(i, n);
    const optimisticValue = optimisticFn(articlesLeft, capacityLeft);
    if (optimisticValue + totalValue > solution) {
      branch([...x, 1], capacityLeft - weight, totalValue + value);
      branch([...x, 0], capacityLeft, totalValue);
    }
  };
  branch();
  return { solution, choices, optimal: true };
};
const bestFirst = optimisticFn => (articles, capacity) => {
  const n = articles.length;
  let choices = Array(n).fill(0);
  let solution = 0;
  const branch = (x = [], capacityLeft = capacity, totalValue = 0) => {
    if (capacityLeft < 0) {
      return;
    }
    if (x.length >= n) {
      if (totalValue > solution) {
        solution = totalValue;
        choices = x;
      }
      return;
    }
    const i = x.length;
    const { value, weight } = articles[i];
    const articlesLeft = articles.slice(i + 1, n);
    const optimisticIfTake =
      totalValue + value + optimisticFn(articlesLeft, capacityLeft - weight);
    const optimisticIfDiscard =
      totalValue + optimisticFn(articlesLeft, capacityLeft);
    if (optimisticIfTake >= optimisticIfDiscard) {
      if (optimisticIfTake > solution) {
        branch([...x, 1], capacityLeft - weight, totalValue + value);
      }
      if (optimisticIfDiscard > solution) {
        branch([...x, 0], capacityLeft, totalValue);
      }
    } else {
      if (optimisticIfDiscard > solution) {
        branch([...x, 0], capacityLeft, totalValue);
      }
      if (optimisticIfTake > solution) {
        branch([...x, 1], capacityLeft - weight, totalValue + value);
      }
    }
  };
  branch();
  return { solution, choices, optimal: true };
};
module.exports = { bestFirst, deepFirst };
