/**
 * Time O(n^2) | Space O(n) | n^2 because of the inner loop which runs from 0 to n on each call.
 * DFS | DP | Recursion | Tree
 * https://leetcode.com/problems/unique-binary-search-trees/
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
    
    const cache = {};

    const dfs = (n) => {
        if(n <= 1) return 1;
        if(cache[n]) return cache[n];

        let total = 0;
        for(let i = 0; i < n; i++) {
            total += dfs(i) * dfs(n - 1 - i);
        }

        cache[n] = total;
        return total;
    }

    return dfs(n);
};
