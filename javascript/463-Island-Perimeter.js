/*
 * Time O(n * m) | Space O(n * m)
 * https://leetcode.com/problems/island-perimeter/
 * @param {number[][]} grid
 * @return {number}
 */

var islandPerimeter = function(grid) {
    let visited  = {};
    
    function dfs(r, c){
        let visitedKey = r + "," + c;
        
        if(visited[visitedKey]) return 0;
        
        if(r < 0 || r == grid.length || c < 0 || c  == grid[0].length || grid[r][c] == 0){
            return 1;
        }
        
        visited[visitedKey] = 1;
        
        let perimeter = dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
        
        return perimeter;  
    }
    
    for(let i = 0 ; i < grid.length; i++){
        for(let j = 0 ; j < grid[0].length; j++){
            if(grid[i][j] == 1) return dfs(i, j);
        }
    }

};