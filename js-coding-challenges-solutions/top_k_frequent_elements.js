function topKFrequent(nums, k) {
  const frequenciesMap = new Map();
  for (const num of nums) {
    const current = frequenciesMap.get(num) || 0;
    frequenciesMap.set(num, current + 1);
  }

  const sortedFrequenciesMap = new Map([...frequenciesMap.entries()].sort((a, b) => b[1] - a[1]))

  const results = [];
  const keys = Array.from(sortedFrequenciesMap.keys());
  for (let i = 0; i < k; i++) {
    results.push(keys[i]);
  }
  return results;
}

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2))