/**
 * Time O(ROWS * COLS) | Space O(1)
 * https://leetcode.com/problems/rotate-image/
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
 var rotate = (matrix) => {
    transpose(matrix);/* Time O(ROWS * COLS) */
    reflect(matrix);  /* Time O(ROWS * COLS) */
};

var transpose = (matrix) => {
    const rows = matrix.length;

    for (let row = 0; (row < rows); row++) {/* Time O(ROWS) */
        for (let col = (row + 1); (col < rows); col++) {/* Time O(COLS) */
            swap1(matrix, row, col);
        }
    }
};

var swap1 = (matrix, row, col) => [matrix[row][col], matrix[col][row]] = [matrix[col][row], matrix[row][col]];

var reflect = (matrix) => {
    const rows = matrix.length;

    for (let row = 0; (row < rows); row++) {/* Time O(ROWS) */
        for (let col = 0; (col < (rows / 2)); col++) {/* Time O(COLS) */
            const reflection = ((rows - col) - 1);

            swap2(matrix, row, col, reflection);
        }
    }
}

var swap2 = (matrix, row, col, reflection) => [matrix[row][col], matrix[row][reflection]] = [matrix[row][reflection], matrix[row][col]];

/**
 * Time O(ROWS * COLS) | Space O(1)
 * https://leetcode.com/problems/rotate-image/
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
 var rotate = (matrix) => {
    reverse(matrix);  /* Time O(ROWS) */
    transpose(matrix);/* Time O(ROWS * COLS) */
};

var reverse = (matrix) => matrix.reverse();

var transpose = (matrix) => {
    const rows = matrix.length;

    for (let row = 0; (row < rows); row++) {/* Time O(ROWS) */
        for (let col = 0; (col < row); col++) {/* Time O(COLS) */
            swap(matrix, row, col);
        }
    }
}

var swap = (matrix, row, col) => [matrix[row][col], matrix[col][row]] = [matrix[col][row], matrix[row][col]];