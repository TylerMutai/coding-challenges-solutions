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

function appendParenthesisToValue(number) {
  let combinations = [];
  let indexOfSecondBracket = 1;
  let indexOfFirstBracket = 0;

  while (indexOfFirstBracket < number.length) {
    for (let i = 0; i < number.length; i++) {
      let str = "";
      str += number.substring(0, indexOfFirstBracket) + "(" + number.substring(indexOfFirstBracket, indexOfSecondBracket) + ")" + number.substring(indexOfSecondBracket);
      indexOfSecondBracket += 2;
      combinations.push(str)
    }
    indexOfFirstBracket += 2
  }

  // Split numbers to two
  const midpoint = Math.floor(number.length / 2)
  const num1 = number.substring(0, midpoint);
  const op = number.substring(midpoint, midpoint + 1);
  const num2 = number.substring(midpoint + 1)
  combinations.push("(" + num1 + ")" + op + "(" + num2 + ")");

  return combinations;
}

function evaluateExpression(numbers, operations) {
  let numbersWithOperations = "";

  for (let i = 0; i < operations.length; i++) {
    numbersWithOperations += numbers[i] + operations[i];
  }
  numbersWithOperations += numbers[numbers.length - 1];

  const combinations = appendParenthesisToValue(numbersWithOperations);

  const result = eval(numbersWithOperations);
  if (result === 24) return [24, numbersWithOperations];
  let closestValue = 0;
  let lastCm = "";
  for (const cm of combinations) {
    const res = eval(cm);
    lastCm = cm;
    if (res === 24) {
      return [res, cm];
    } else {
      // TODO:
    }
  }
  return [closestValue, lastCm];
}

/*const operationsWeight = {
  "/": 3,
  "*": 2,
  "+": 1,
  "-": 0
}

function checkIfSequenceIsCorrect(operations) {
  let result = 0;
  for (let i = 0; i < operations.length; i++) {
    result -= operationsWeight[operations[i]]
  }
  return result >= 0;
}*/

function solve24(numStr) {
  const numbers = numStr.split("");
  const permutations = permutation(numbers);
  const operations = possibleOperations(numbers.length - 1)

  const allPossibleResults = [];
  for (const perm of permutations) {
    for (const op of operations) {
      const result = evaluateExpression(perm, op);
      if (op[0] === "-") {
        console.log("Operations: ", op)
        console.log("Permutations: ", perm)
        console.log("Result", result);
        console.log("_--------------------_")
      }
      if (Math.abs(result[0] - 24) < 1e-10) {
        allPossibleResults.push(result[1])
      }
    }
  }
  if (allPossibleResults.length > 0) {
    return allPossibleResults[0];
  }

  return "no solution exists";
}

console.log(solve24("1127"));

