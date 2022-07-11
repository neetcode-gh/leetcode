/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    function find(x, y) {
        if (grid[y] === undefined || grid[y][x] === undefined) {
            return 0;
        }
        
        if (grid[y][x] === 0) {
            return 0;
        }
        
        grid[y][x] = 0;
        
        let square = 1;
        
        square += find(x + 1, y);
        square += find(x - 1, y);
        square += find(x, y + 1);
        square += find(x, y - 1);
        
        return square;
    }
    
    let max = 0;
    
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            max = Math.max(max, find(x, y));
        }
    }
    
    return max;
};
