const MinStack = function () {
  this.minIndicesStack = [];
  this.stack = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  if (this.stack.length === 0) {
    this.minIndicesStack = [val];
  } else {
    const currentMinimum = this.minIndicesStack[this.minIndicesStack.length - 1];
    if (val <= currentMinimum) {
      this.minIndicesStack.push(val);
    }
  }
  this.stack.push(val);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  if (this.minIndicesStack.length > 0) {
    const lastValue = this.stack[this.stack.length - 1];
    const minimumValue = this.minIndicesStack[this.minIndicesStack.length - 1];
    if (lastValue === minimumValue) {
      this.minIndicesStack.pop();
    }
  }
  this.stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minIndicesStack[this.minIndicesStack.length - 1]
};

const minStack = new MinStack();
minStack.push(0);
minStack.push(1);
minStack.push(0);
console.log(minStack.getMin()); // return -3
minStack.pop();
// console.log(minStack.top());    // return 0
console.log(minStack.getMin()); // return -2