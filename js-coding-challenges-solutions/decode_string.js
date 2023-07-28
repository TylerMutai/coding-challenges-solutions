function decodeString(str) {
  const numStack = [], charsStack = [];
  const chars = str.split("");

  let consecutiveNumbers = false;
  for (const char of chars) {
    if (isNaN(parseInt(char))) {
      consecutiveNumbers = false;
      if (char === "]") {

        // start popping
        let reversedString = [];
        while (charsStack[charsStack.length - 1] !== "[") {
          reversedString.push(charsStack.pop());
        }
        // pop the opening bracket
        charsStack.pop();
        // console.log("Reversed String", reversedString);
        let originalString = "";
        for (let i = reversedString.length - 1; i >= 0; i--) {
          originalString += reversedString[i];
        }
        // console.log("Original String", originalString);

        const noOfRepeats = numStack.pop();
        let current = 0;
        while (current < noOfRepeats) {
          charsStack.push(originalString);
          current++;
        }

        // console.log("Numbers Stack", numStack);
        // console.log("Characters Stack", charsStack)
        // console.log("----------------");

      } else {
        charsStack.push(char);
      }
    } else {
      if (consecutiveNumbers) {
        numStack[numStack.length - 1] = numStack[numStack.length - 1] + char;
      } else {
        numStack.push(char);
      }
      consecutiveNumbers = true;
    }
    // console.log("Numbers Stack", numStack);
    // console.log("Characters Stack", charsStack)
    // console.log("----------------");
  }
  // console.log("Numbers Stack", numStack);
  // console.log("Characters Stack", charsStack)
  // console.log("----------------");
  return charsStack.join("");
}


console.log(decodeString("100[leetcode]"));
console.log(decodeString("3[a]2[bc]"));
console.log(decodeString("3[a2[c]]"));