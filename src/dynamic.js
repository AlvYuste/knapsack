const dynamicRecursion = (articles, capacity) => {
  const n = articles.length;
  const choices = Array(n).fill(0);
  const o = (k, j) => {
    if (j === -1) {
      return 0;
    }
    const { value, weight } = articles[j];
    if (weight > k) {
      return o(k, j - 1);
    }
    return Math.max(o(k, j - 1), value + o(k - weight, j - 1));
  };
  const solution = o(capacity, n - 1);
  return { solution, choices, optimal: true };
};

const dynamicTable = (articles, capacity) => {
  const n = articles.length;
  const choices = Array(n).fill(0);
  const table = Array(n).fill();

  const getO = (k, j) => (k < 0 || j < 0 ? 0 : table[j][k]);
  const setO = (k, j, v) => (table[j][k] = v);
  table.forEach((row, j) => {
    const { value, weight } = articles[j];
    table[j] = Array(capacity).fill();
    table[j].forEach((cell, k) => {
      const prevO = getO(k, j - 1);
      if (weight > k + 1) {
        setO(k, j, prevO);
      } else {
        setO(k, j, Math.max(prevO, value + getO(k - weight, j - 1)));
      }
    });
  });
  console.log(table);
  return { solution: getO(capacity - 1, n - 1), choices, optimal: true };
};

module.exports = {
  dynamicTable,
  dynamicRecursion
};
