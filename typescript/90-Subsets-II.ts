function subsetsWithDup(nums: number[]): number[][] {
  let res: number[][] = [];
  nums.sort();

  function backtrack(i: number, subset: number[]) {
    if (i == nums.length) {
      res.push(subset.slice());
      return;
    }

    subset.push(nums[i]);
    backtrack(i + 1, subset);

    subset.pop();

    while (i + 1 < nums.length && nums[i] == nums[i + 1]) {
      i += 1;
    }

    backtrack(i + 1, subset);
  }

  backtrack(0, []);

  return res;
}
