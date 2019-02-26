const capacityRelaxation = articles =>
  articles.reduce((total, { value }) => total + value, 0);

const linearRelaxation = (articles, capacity) => {
  // Sort items by its value density
  const sortedArticles = articles.sort((a, b) => a.density <= b.density);
  const result = { value: 0, weight: 0 };
  for (let i = 0; i < articles.length && result.weight < capacity; i++) {
    const { value, weight } = sortedArticles[i];
    if (result.weight + weight < capacity) {
      // Take the full item if it fits
      result.weight += weight;
      result.value += value;
    } else {
      // Take a portion if it doen't fit entirely
      const weigthLeft = capacity - result.weight;
      result.weight += weigthLeft;
      result.value += value * (weigthLeft / weight);
    }
  }
  return result.value;
};

module.exports = {
  capacityRelaxation,
  linearRelaxation
};
