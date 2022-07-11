function subsets(nums) {
  let res = [];
  let subset = [];
  function dfs(i) {
    if (i >= nums.length) {
      res.push(subset.slice());
      return;
    }

    subset.push(nums[i]);
    dfs(i + 1);

    subset.pop();
    dfs(i + 1);
  }

  dfs(0);

  return res;
}
