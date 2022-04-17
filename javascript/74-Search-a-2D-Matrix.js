/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    const ROWS = matrix.length,
        COLS = matrix[0].length;
    let left = 0,
        right = ROWS * COLS - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let row = Math.floor(mid / COLS),
            col = mid % COLS;
        if (target === matrix[row][col]) {
            return true;
        }

        if (target > matrix[row][col]) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return false;
};
