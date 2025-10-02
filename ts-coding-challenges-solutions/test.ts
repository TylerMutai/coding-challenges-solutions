const sum = (a: number, b: number, c: number) => {
  return a + b + c;
};

function carriedSum(a: number) {
  return function sumB(b: number) {
    return function sumC(c: number) {
      return a + b + c;
    };
  };
}

console.log(sum(1, 2, 3));

const f1 = carriedSum(1);
const f2 = f1(2);
const _sum = f2(3);
console.log(_sum);
console.log(carriedSum(1)(2)(3));
