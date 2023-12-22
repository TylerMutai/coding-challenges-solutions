/**
 * You are given an integer array nums. You are initially positioned at the array's first index,
 * and each element in the array represents your maximum jump length at that position.
 *
 * Return true if you can reach the last index, or false otherwise.
 */

const canJump = (nums) => {
  let currentStep = nums[0];
  if (currentStep === 0) {
    return false;
  }

  for (let i=0;i<nums.length;i++) {
    // get all possible jumps.
    let _jumps =  nums[i];
    const possibilities = [];
    while (_jumps > 0){
      possibilities.push(_jumps);
      _jumps--;
    }
    for (const p of possibilities){
      for (i = p + i; i < nums.length;i++){
        const num = nums[i];
        if(num === 0 || i >= nums.length){
          return  false;
        }
        let _jumps = nums[i];
      }
    }
  }


};