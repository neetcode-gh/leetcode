/**
 * DP | Memoization
 * Time O(n^2) | Space O(n^2)
 * https://leetcode.com/problems/painting-the-walls/
 * @param {number[]} cost
 * @param {number[]} time
 * @return {number}
 */
var paintWalls = function(cost, time) {
    
    const cache = new Map();

    const dfs = (i, remaining) => {

        const hash = `${i},${remaining}`;

        if (cache.has(hash)) return cache.get(hash);
        if (remaining <= 0) return 0;
        if (i === cost.length) return Infinity;

        const res = Math.min(cost[i] + dfs(i+1, remaining - 1 - time[i]), dfs(i+1, remaining));
        cache.set(hash, res);
        return res;
    }

    return dfs(0, time.length);
};
