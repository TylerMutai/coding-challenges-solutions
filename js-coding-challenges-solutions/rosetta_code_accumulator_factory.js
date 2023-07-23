function accumulator(sum) {
  return function(num){
    sum += num;
    return sum;
  }
}

let x = accumulator(1);  // x is now a function, n=1
console.log(x(2));  // outputs 3, as n=1+2=3
console.log(x(3));  // outputs 6, as n=3+3=6
console.log(x(4));  // outputs 10, as n=6+4=10