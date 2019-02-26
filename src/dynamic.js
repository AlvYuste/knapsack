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
  const table = Array(n).fill();
  // Table accessors
  const getO = (k, j) => (k < 0 || j < 0 ? 0 : table[j][k]);
  const setO = (k, j, v) => (table[j][k] = v);
  // Filling table
  table.forEach((_, j) => {
    const { value, weight } = articles[j];
    table[j] = Array(capacity).fill();
    table[j].forEach((_, k) => {
      const prevO = getO(k, j - 1);
      if (weight > k + 1) {
        setO(k, j, prevO);
      } else {
        setO(k, j, Math.max(prevO, value + getO(k - weight, j - 1)));
      }
    });
  });
  // Trace back recursion
  const traceBack = (k, j) => {
    if (j < 0) {
      return [];
    }
    if (getO(k, j) === getO(k, j - 1)) {
      return [...traceBack(k, j - 1), 0];
    }
    return [...traceBack(k - articles[j].weight, j - 1), 1];
  };
  // Calculate solution
  const solution = getO(capacity - 1, n - 1);
  const choices = traceBack(capacity - 1, n - 1);
  return { solution, choices, optimal: true };
};

module.exports = {
  dynamicTable,
  dynamicRecursion
};
