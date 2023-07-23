function ack(m, n) {
  if (m === 0) {
    return n + 1;
  }

  if (m > 0 && n === 0) {
    return ack(m - 1, 1);
  }

  return ack(m - 1, ack(m, n - 1))
}

console.log(ack(0, 0));
console.log(ack(1, 1));
console.log(ack(2, 5));
console.log(ack(3, 3));