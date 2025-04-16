/**
 * Brute Force | Hash Set
 * Time O(n^2) | Space O(n^2)
 * https://leetcode.com/problems/find-missing-and-repeated-values
 * @param {number[][]} grid
 * @return {number[]}
 */
var findMissingAndRepeatedValues = function(grid) {
    
    const n = grid.length;
    const haves = new Set();
    const visited = new Set();
    let doubleCount = -1;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            haves.add(grid[i][j]);
            if (visited.has(grid[i][j])) {
                doubleCount = grid[i][j];
            }
            visited.add(grid[i][j]);
        }
    }

    let missing = -1;

    for (let i = 0; i < n**2; i++) {
        if (!haves.has(i+1)) {
            missing = i+1;
        }
    }
    
    return [doubleCount, missing];
};
