var islandPerimeter = function(grid) {
        const row = grid.length;
    const column = grid[0].length;
    let perimeter = 0;
    for(let i = 0; i < row; i++) {
        for(let j = 0; j< column; j++) {
            if(grid[i][j] == 1) {
                perimeter += 4;

                if(i > 0 && grid[i - 1][j] == 1) {
                    perimeter -= 2;
                }
                if(j > 0 && grid[i][j - 1] == 1) {
                    perimeter -= 2;
                }
            }
        }
    }

    return perimeter
};
