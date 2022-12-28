/**
 * https://leetcode.com/problems/combination-sum-ii/
 * Time O(2^N) | Space O(N)
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
 var combinationSum2 = function(candidates, target) {
    candidates.sort((a, b) => a - b)

    return dfs(candidates, target)
};

const dfs = (candidates, target, index = 0, combination = [], combinations = []) => {
    const isBaseCase = target < 0;
    if (isBaseCase) return combinations;

    const isTarget = target === 0;
    if (isTarget) {
        if (combination.length) combinations.push(combination.slice());

        return combinations
    }

    for (let i = index; i < candidates.length; i++) {
        const isDuplicate = (index < i) && (candidates[i - 1] === candidates[i]);
        if (isDuplicate) continue;

        backTrack(candidates, target, i, combination, combinations);
    }

    return combinations;
}

const backTrack = (candidates, target, i, combination, combinations) => {
    combination.push(candidates[i])
        dfs(candidates, (target - candidates[i]), (i + 1), combination, combinations)
    combination.pop()
}
