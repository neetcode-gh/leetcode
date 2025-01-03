/**
 * BackTracking | Recursion
 * Time O(((n!)/(n-k)!*k!)*k) | Space O((n!)/(n-k)!*k!) (Because we'll nedd the number of combinations space to store them in the array)
 * https://leetcode.com/problems/combinations/
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    
    const dfs = (idx, level, currCombo, combinations) => {
        if (level === k) {
            combinations.push(currCombo.slice(0));
            return;
        }

        for (let i = idx; i < n + 1; i++) {
            currCombo.push(i);
            dfs(i+1, level+1, currCombo, combinations);
            currCombo.pop();
        }

        return combinations;
    }

    return dfs(1, 0, [], []);
};
