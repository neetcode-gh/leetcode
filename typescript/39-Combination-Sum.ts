function combinationSum(candidates: number[], target: number): number[][] {
  let res: number[][] = [];

  function dfs(i: number, cur: number[], total: number) {
    if (total == target) {
      res.push(cur.slice());
      return;
    }
    if (i >= candidates.length || total > target) {
      return;
    }

    cur.push(candidates[i]);
    dfs(i, cur, total + candidates[i]);

    cur.pop();
    dfs(i + 1, cur, total);
  }

  dfs(0, [], 0);

  return res;
}
