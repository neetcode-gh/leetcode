/**
 * Recursive DP | Memoization
 * Time O(n^3) | Space O(1) 
 * https://leetcode.com/problems/minimum-falling-path-sum-ii/
 * Tip (This is just like recursive solution but you're doing it in for loop instead of callStack)
 * @param {number[][]} grid
 * @return {number}
 */
var minFallingPathSum = function(grid) {
    
    const ROW = grid.length;
    const COL = grid[0].length;

    for (let row = ROW-2; row > -1; row--) {
        for (let col = 0; col < COL; col++) {
            const originalCellVal = grid[row][col];
            grid[row][col] = Infinity;
            for (let nextRowCol = 0; nextRowCol < COL; nextRowCol++) {
                if (nextRowCol === col) continue;
                grid[row][col] = Math.min(grid[row][col],originalCellVal + grid[row+1][nextRowCol])
            }
        }
    }

    return Math.min(...grid[0]);
};
