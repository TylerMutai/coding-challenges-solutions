/**
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 *
 * An input string is valid if:
 *
 * Open brackets must be closed by the same type of brackets.
 * Open brackets must be closed in the correct order.
 * Every close bracket has a corresponding open bracket of the same type.
 */
function isValid(s) {
  const sChars = s.split("");
  const stack = [];

  const partners = {
    "(": ")",
    "{": "}",
    "[": "]"
  };

  for (const char of sChars) {
    // opening
    if (partners[char]) {
      stack.push(char);
    } else {
      const closing = stack[stack.length - 1];
      if (partners[closing] !== char) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length === 0;
}