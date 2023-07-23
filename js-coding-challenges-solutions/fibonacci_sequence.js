function fibonacciSequence(arr, num) {
  if (arr.length === 0) return fibonacciSequence([0, 1], num);

  const sum = arr[arr.length - 2] + arr[arr.length - 1];
  if (sum > num) {
    return arr;
  }
  arr.push(sum);
  return fibonacciSequence(arr, num);
}

function fibonacciSequenceLoop(num) {
  const sequence = [0, 1];
  let index = 1;
  let currentSum = sequence[index - 1] + sequence[index];
  while (currentSum <= num) {
    sequence.push(currentSum);
    index++;
    currentSum = sequence[index - 1] + sequence[index];
  }
  return sequence
}

const max = 34;
console.log(fibonacciSequence([], max))
console.log(fibonacciSequenceLoop(max))