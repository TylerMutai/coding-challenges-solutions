/**
 * You are given an array of strings tokens that represents a valid arithmetic expression in Reverse Polish Notation.
 *
 * Return the integer that represents the evaluation of the expression.
 *
 * The operands may be integers or the results of other operations.
 * The operators include '+', '-', '*', and '/'.
 * Assume that division between integers always truncates toward zero.
 */
function evalRPN(tokens) {
  let n = 0;
  const stack = [];

  while(n < tokens.length) {
    if(tokens[n] === "+" || tokens[n] === "-" || tokens[n] === "/" || tokens[n] === "*") {
      console.log("Stack Start First Operand: ", stack);
      console.log("Stack Start First Operand: ", tokens[n]);
      const op2 = stack.pop();
      console.log("op2: ", op2);
      const op1 = stack.pop();
      console.log("op1: ", op1);
      if (tokens[n] === "+") {
        stack.push(op1 + op2);
      } else if (tokens[n] === "-") {
        stack.push(op1 - op2);
      } else if (tokens[n] === "*") {
        stack.push(op1 * op2);
      } else if (tokens[n] === "/") {
       /* const res = `${op1 / op2}`;
        const ss = res.indexOf(".");
        if(ss === - 1){
          stack.push(parseInt(res))
        } else {
          stack.push(parseInt(res.substring(0, ss + 1)));
        }*/
        stack.push(Math.trunc(op1/op2));

      }
      console.log("Stack End After Operand: ", stack);
    } else {
      stack.push(parseInt(tokens[n]));
    }
    n++;
  }
  console.log("Stack End: ", stack);
  return stack[0];
}


// console.log(evalRPN(["1", "2", "+", "3", "*", "4", "-"]));
// console.log(evalRPN([ '4', '13', '5', '/', '+' ]));
console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]));


/**
 * t=["4", "13", "5", "/", "+"]
 *
 * s=[]
 *
 * n = 0, = 4, s.push(4)
 * n = 1, = 13, s.push(13)
 * n = 2, = 5, s.push(5)
 * s = [4, 13, 5]
 *
 * n = 3 = /
 *
 * a = s.pop(); = 5;
 * b = s.pop(); = 13;
 *
 * b/a = 13/5 = 2.6;
 *
 * s.push(2.6);
 * s = [4, 2.6];
 *
 * n = 4 = +
 *
 * a = s.pop(); = 2.6
 * b = s.pop(); = 4
 *
 * b + a = 4 + 2.6 = 6.6
 *
 */