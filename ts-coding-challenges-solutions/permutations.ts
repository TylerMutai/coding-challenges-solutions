/**
 * Given an array nums of unique integers, return all the possible permutations. You may return the answer in any order.
 */

const permutate = (nums: number[]) => {
  const permutations = (nums: number[]) => {
    if (nums.length === 0) {
      return [[]];
    }

    const perms = permutations(nums.slice(1));
    const res: number[][] = [[]];
    console.log("perms: ", perms);
    for (const perm of perms) {
      for (let i = 0; i < perm.length + 1; i++) {
        const newArr = [...perm];
        newArr.splice(i, 0, nums[0]);
        console.log("newArr: ", newArr);
        res.push(newArr);
      }
    }

    return res;
  };
  const perms = permutations(nums);
  return perms.filter((p) => p.length === nums.length);
};

console.log("permutations: ", permutate([1, 2, 3]));
