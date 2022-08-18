/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function(matrix) {
    const ROWS = matrix.length;
    const COLS = matrix[0].length;
    const dp = {}; // r|c -> LIP
    
    function dfs(r, c, prevVal) {
        if (r < 0 || r === ROWS ||
            c < 0 || c === COLS ||
            matrix[r][c] <= prevVal) {
            return 0;
        }
        
        if (dp.hasOwnProperty(`${r}|${c}`)) {
            return dp[`${r}|${c}`];
        }
        
        let res = 1;
        res = Math.max(res, 1 + dfs(r + 1, c, matrix[r][c]));
        res = Math.max(res, 1 + dfs(r - 1, c, matrix[r][c]));
        res = Math.max(res, 1 + dfs(r, c + 1, matrix[r][c]));
        res = Math.max(res, 1 + dfs(r, c - 1, matrix[r][c]));
        dp[`${r}|${c}`] = res;
        return res;
    }
    
    for (var r = 0; r < ROWS; r++) {
        for (var c = 0; c < COLS; c++) {
            dfs(r, c, -1);
        }
    }
    
    return Math.max(...Object.values(dp));
}
