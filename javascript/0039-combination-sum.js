/**
 * https://leetcode.com/problems/combination-sum/
 * Time: O((Target/MIN)*(2^k)) where k is the sum of target/candidate[i] from i = 0 to size of candidate - 1
 * Space: O(Target/MIN)
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
 var combinationSum = function (candidates, target, index = 0, combination = [], combinations = []) {
    const isBaseCase = target < 0;
    if (isBaseCase) return combinations;

    const isTarget = target === 0;
    if (isTarget) return combinations.push(combination.slice()); // Time of calling slice(): Target/MIN

    for (let i = index; i < candidates.length; i++) {
        backTrack(candidates, target, i, combination, combinations);
    }

    return combinations;
}

const backTrack = (candidates, target, i, combination, combinations) => {
    combination.push(candidates[i]);
        combinationSum(candidates, (target - candidates[i]), i, combination, combinations);
    combination.pop();
}
