let memo = [];

// stores the computed number of names to avoid redundant re-computing
function numberOfNames(num) {
  // prefill memo array with default values.
  for (let i = 0; i <= num; i++) {
    if (!memo[i]) {
      memo[i] = [];
    }
    for (let j = 0; j <= num; j++) {
      memo[i].push(-1);
    }
  }

  for (let i = 0; i <= num; i++) {
    console.log(`The integer ${i} has ${countNames(i, i)} names.`)
  }

}

function countNames(start, end) {
  if (start === 0) return 1;
  if (start < 0 || end === 0) return 0;

  if (memo[start][end] === -1) {
    memo[start][end] = countNames(start, end - 1) + countNames(start - end, end)
  }
  return memo[start][end]
}

numberOfNames(5);