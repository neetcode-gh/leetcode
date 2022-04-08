/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
 var combinationSum = function(candidates, target) {
	const combinations = [];

	function dfs(i, curr, sum) {
		if (i >= candidates.length || sum > target) return;
		if (sum == target) {
      combinations.push([...curr]);
      return;
    };

    curr.push(candidates[i]);
    dfs(i, curr, sum + candidates[i]);
    curr.pop();
    dfs(i+1, curr, sum);
	};
  dfs(0,[],0);
	return combinations;
};