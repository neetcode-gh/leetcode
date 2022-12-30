/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function(grid) {
    const m = grid.length, n = grid[0].length, s = Array(m).fill().map(_ => Array(n).fill(0));
    const inValid = (i, j) => i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0;
    const dfs = (i, j) => {
        if(inValid(i, j)) return 1;
        if(s[i][j]) return 0;
        s[i][j] = 1;
        return dfs(i + 1, j) + dfs(i - 1, j) + dfs(i, j + 1) + dfs(i, j - 1);
    }
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            if(grid[i][j]) return dfs(i, j);
        }
    }
};