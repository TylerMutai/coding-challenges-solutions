function permutation(numbers) {
  const combinations = []

  //base case
  if (numbers.length === 1) {
    return [numbers];
  }

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    const remainingArr = theRestOfTheArray(numbers, i);
    const permutations = permutation(remainingArr);

    let s = num + "";
    for (const p of permutations) {
      let ss = s + p;
      combinations.push(ss);
    }
  }
  return combinations;
}

function possibleOperations(length) {
  if (length === 1) return [['+'], ['-'], ['*'], ['/']];

  const result = [];
  const prevLength = possibleOperations(length - 1);
  for (const opComb of prevLength) {
    result.push(opComb.concat('/'));
    result.push(opComb.concat('*'));
    result.push(opComb.concat('+'));
    result.push(opComb.concat('-'));
  }

  return result;
}

function theRestOfTheArray(arr, idx) {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== idx) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

function evaluateExpression(numbers, operations) {
  let result = numbers[0];

  for (let i = 0; i < operations.length; i++) {
    if (operations[i] === '+') result += numbers[i + 1];
    if (operations[i] === '-') result -= numbers[i + 1];
    if (operations[i] === '*') result *= numbers[i + 1];
    if (operations[i] === '/') result /= numbers[i + 1];
  }

  return result;
}

function checkIfSequenceIsCorrect(operations) {
  for (let i = 1; i < operations.length; i++) {
    const currentOp = operations[i - 1];
    const nextOp = operations[i];
    switch (currentOp) {
      case "/":
        if (nextOp !== "*" && nextOp !== "/") return false;
        break;
      case "*":
        if (nextOp !== "*" && nextOp !== "+") return false;
        break;
      case "+":
        if (nextOp !== "+" && nextOp !== "-") return false;
        break;
      case "-":
        // should be the final operation.
        if (i !== operations.length) return false;
        break;
    }
  }
  return true;
}

function formatString(numbers, operations) {
  const isSequenceCorrect = checkIfSequenceIsCorrect(operations);
  let operationString = numbers[0] + "";
  if (!isSequenceCorrect) {
    operationString = `(${operationString}`
  }
  for (let i = 0; i < operations.length; i++) {
    operationString += operations[i] + numbers[i + 1]
    if (!isSequenceCorrect && i < operations.length) {
      operationString = `${operationString})`
    }
  }
  return operationString;
}

function solve24(numStr) {
  const numbers = numStr.split("");
  const permutations = permutation(numbers);
  const operations = possibleOperations(numbers.length - 1)

  for (const perm of permutations) {
    for (const op of operations) {
      const result = evaluateExpression(perm, op);
      if (op[0] === "-") {
        console.log("Operations: ", op)
        console.log("Permutations: ", perm)
        console.log("Result", result);
        console.log("_--------------------_")
      }
      if (Math.abs(result - 24) < 1e-10) {
        return formatString(perm, op)
      }
    }
  }

  return "no solution exists";
}

console.log(solve24("4878"));

