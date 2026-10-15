/**
 * DP | Recursion
 * Time O(n^2) | Space O(n^2)
 * https://leetcode.com/problems/number-of-ways-to-stay-in-the-same-place-after-some-steps/
 * @param {number} steps
 * @param {number} arrLen
 * @return {number}
 */
var numWays = function(steps, arrLen) {
    
    const cache = new Map();
    const mod = 10**9 + 7;

    const dfs = (i, leftSteps) => {

        const hash = `${i},${leftSteps}`;

        if (cache.has(hash)) return cache.get(hash);
        if (i < 0 || i === arrLen) return 0;
        if (i === 0 && leftSteps === 0) return 1;
        if (leftSteps === 0) return 0;

        const res = (dfs(i-1, leftSteps-1) + dfs(i+1, leftSteps-1) + dfs(i, leftSteps-1)) % mod;
        cache.set(hash, res);
        return res;
    }

    return dfs(0,steps);
};
