/*
 * Time O(N * M) | Space O(N * M)
 * https://leetcode.com/problems/island-perimeter/
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = (grid) => {
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

/*
 * Counting
 * Time O(N * M) | Space O(1)
 * https://leetcode.com/problems/island-perimeter/
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = (grid, perimeter = 0) => {    
    const [ rows, cols ]  = [ grid.length, grid[0].length ];
    
    for (let row = 0; row < rows; row++) {/* Time O(N) */
        for (let col = 0; col < cols; col++) {/* Time O(M) */
            const isWater = (grid[row][col] === 0);
            if (isWater) continue;
            
            const up = (row === 0)
                ? 0
                : grid[(row - 1)][col];
            

            const left = (col == 0)
                ? 0 
                : grid[row][(col - 1)];


            const down = (row == (rows - 1))
                ? 0
                : grid[(row + 1)][col];

            const right = (col == (cols - 1))
                ? 0
                : grid[row][(col + 1)];

            perimeter += (4 - (up + left + right + down));
        }
    }

    return perimeter;
};

/*
 * Better Counting
 * Time O(N * M) | Space O(1)
 * https://leetcode.com/problems/island-perimeter/
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = (grid, perimeter = 0) => {    
    const [ rows, cols ]  = [ grid.length, grid[0].length ];
    
    for (let row = 0; row < rows; row++) {/* Time O(N) */
        for (let col = 0; col < cols; col++) {/* Time O(M) */
            const isWater = (grid[row][col] === 0);
            if (isWater) continue;
            
            perimeter += 4;
            
            const isTopIsLand = ((0 < row) && isIsland(grid[row - 1][col]));
            if (isTopIsLand) perimeter -= 2;

            const isLeftIsland = ((0 < col) && isIsland(grid[row][col - 1]));
            if (isLeftIsland) perimeter -= 2;
        }
    }

    return perimeter;
};

var isIsland = (node) => (node === 1);
