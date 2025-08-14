/**
 * You are given an integer n.
 * Return all well-formed parentheses strings that you can generate with n pairs of parentheses.
 */

const generateParenthesis = (n: number) => {

  const result: string[] = [];
  const stack: string[] = [];

  const backtrack = (openN: number, closeN: number) => {
    if (openN === closeN && openN === n && closeN === n) {
      result.push(stack.join(""));
    }

    if (openN < n) {
      stack.push("(");
      backtrack(openN + 1, closeN);
      stack.pop();
    }

    if (closeN < openN) {
      stack.push(")");
      backtrack(openN, closeN + 1);
      stack.pop();
    }
  };

  backtrack(0, 0);
  return result;
};

console.log(generateParenthesis(3));