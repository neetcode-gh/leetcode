/**
 * 2D-DP | Memoization
 * Time O(n^3) | Space O(n^3);
 * https://leetcode.com/problems/cherry-pickup-ii/
 * @param {number[][]} grid
 * @return {number}
 */
var cherryPickup = function(grid) {
    
    const ROW = grid.length;
    const COL = grid[0].length;
    const cache = new Map();

    const columnOutOfBound = (c) => {
        if (c < 0) return true;
        if (c === COL) return true;
        return false;
    }
    
    const dfs = (r1, c1, c2) => {

        const hash = `${r1}-${c1}-${c2}`;
        if (cache.has(hash)) return cache.get(hash);
        if (columnOutOfBound(c1) || columnOutOfBound(c2)) return 0;
        if (r1 === ROW) return 0;

        const currTwoRobotSum = grid[r1][c1] + (c1 !== c2 && grid[r1][c2] || 0)

        let max = 0;
        for (let i = c1-1; i < c1+2; i++) {
            for (let j = c2-1; j < c2+2; j++) {
               max = Math.max(max, currTwoRobotSum + dfs(r1+1, i, j));
            }
        }

        cache.set(hash, max);
        return max;
    }

    return dfs(0,0, COL-1);
};
