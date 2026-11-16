/**
 * Brute Force | Recursion | Math
 * Time O(2^14) | Space O(1)
 * https://leetcode.com/problems/check-if-number-is-a-sum-of-powers-of-three
 * @param {number} n
 * @return {boolean}
 */
var checkPowersOfThree = function(n) {

    const dfs = (currSum, power) => {

        if (currSum === n) return true;
        if (power > 14) return false;
        return dfs(currSum + 3**power, power+1) || dfs(currSum, power+1);
    }

    return dfs(0, 0);
};
