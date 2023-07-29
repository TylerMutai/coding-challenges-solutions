function kangaroo(x1, v1, x2, v2) {
  if ((x2 > x1 && v2 > v1) || (x1 > x2 && v1 > v2)) {
    return formatResponse(false);
  }

  let current = x1;
  if (x2 < x1) {
    current = x2
  }
  const k = 10000
  let firstSum = x1;
  let secondSum = x2;
  while (current < k) {
    if (firstSum === secondSum) {
      return formatResponse(true);
    }
    firstSum += v1;
    secondSum += v2;
    current++;
  }
  return formatResponse(false);

}

function formatResponse(boolRes) {
  if (boolRes) {
    return "YES";
  } else {
    return "NO";
  }
}

console.log(kangaroo(0, 3, 4, 2))
