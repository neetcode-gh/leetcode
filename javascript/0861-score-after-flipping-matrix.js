/**
 * Greedy
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/score-after-flipping-matrix
 * @param {number[][]} grid
 * @return {number}
 */
var matrixScore = function(grid) {

    const ROW = grid[0].length;
    const COL = grid.length;

    const countZeros = (col) => {

        let start = 0;
        let count = 0;
        while (start < COL) {
            if (!grid[start][col]) count++;
            start++;
        }

        return count;
    }

    const flip = (i, isRow) => {
        let start = 0;

        if (isRow) {
            while (start < ROW) {
                grid[i][start] ^= 1;
                start++;
            }
            return;
        }

        if (!isRow) {
            while (start < COL) {
                grid[start][i] ^= 1;
                start++;
            }
            return;
        }
    }

    for (let i = 0; i < COL; i++) {
        if (!grid[i][0]) flip(i, true);

        for (let j = (grid[i][0] && 1); j < ROW; j++) {
            const numberOfZeros = countZeros(j);
            if (numberOfZeros > COL - numberOfZeros) {
                flip(j, false);
            }
        }
    }

    let total = 0;
    for (let i = 0; i < COL; i++) {
        total += parseInt(grid[i].join(""), 2);
    }

    return total;
};
