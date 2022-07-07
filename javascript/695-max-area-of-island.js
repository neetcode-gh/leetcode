/**
 * @param {number[][]} grid
 * @return {number}
 */
 var maxAreaOfIsland = function(grid) {
    let maxIsland = 0
    for (let i = 0 ; i < grid.length; i++) {
        for (let j = 0 ; j < grid[0].length; j++) {
            maxIsland = Math.max(maxIsland, islandCounter(grid, i , j))
        }
    }
    return maxIsland 
};

function islandCounter(grid, row, col) {
    if (row < 0 || 
        row >= grid.length || 
        col < 0 || 
        col >= grid[0].length || 
        grid[row][col] === 0
    ) {
        return 0
    }
    
    grid[row][col] = 0
    
    const up = islandCounter(grid, row + 1, col)
    const down = islandCounter(grid, row - 1, col)
    const right = islandCounter(grid, row, col + 1)
    const left = islandCounter(grid, row, col - 1)

    return 1 + up + down + right + left
}
