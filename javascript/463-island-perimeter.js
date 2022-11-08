// problem link https://leetcode.com/problems/island-perimeter
// time complexity. it looks O(n^2) but it's actually constant time O(1). Because the input widht  and height won't exeed 100 as stated in the problem.

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
