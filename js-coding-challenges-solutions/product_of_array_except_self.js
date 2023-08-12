/**
 * Given an integer array nums, return an array answer such that answer[i] is equal to the
 * product of all the elements of nums except nums[i].
 *
 * The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 *
 * You must write an algorithm that runs in O(n) time and without using the division operation.
 */
function productExceptSelf(nums) {
  // get overall product of nums
  let overallProduct = 1;
  let numOfZeros = 0;
  for (const num of nums) {
    if (num === 0) {
      numOfZeros++;
    } else {
      overallProduct *= num;
    }
  }

  const products = [];
  if (numOfZeros > 1) {
    for (const num of nums) {
      products.push(0);
    }
  } else if (nums.includes(0)) {
    for (const num of nums) {
      if (num === 0) {
        products.push(overallProduct);
      } else {
        products.push(0);
      }
    }
  } else {
    for (const num of nums) {
      products.push(overallProduct / num);
    }
  }
  return products;
}

console.log(productExceptSelf([0,4,0]));