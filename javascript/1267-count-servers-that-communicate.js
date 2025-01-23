/**
 * 2D Matrix 
 * Time O((m*n) * (m+n)) | Space O(1)
 * https://leetcode.com/problems/count-servers-that-communicate/
 * @param {number[][]} grid
 * @return {number}
 */
var countServers = function(grid) {
    
    const ROW = grid.length;
    const COL = grid[0].length;

    const searchRow = (r,c) => {

        // go left 
        for (let i = c-1; i > -1; i--) {
            if (grid[r][i] === 1) return true;
        }

        // go right 
        for (let i = c+1; i < COL;  i++) {
            if (grid[r][i] === 1) return true;
        }

        return false;
    }

    const searchCol = (r,c) => {
        
        // go down
        for (let i = r+1; i < ROW; i++) {
            if (grid[i][c] === 1) return true;
        }

        // go up
        for (let i = r-1; i > -1; i--) {
            if (grid[i][c] === 1) return true;
        }

        return false;
    }

    let count = 0;
    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COL; c++) {
            if (grid[r][c] && (searchRow(r,c) || searchCol(r,c)) ) count++; 
        }
    }

    return count;
};
