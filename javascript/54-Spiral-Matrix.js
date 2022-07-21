/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    const results = [];
    let startRow = 0,
        startCol = 0,
        endRow = matrix.length - 1,
        endCol = matrix[0].length - 1;

    while (results.length < matrix.length * matrix[0].length) {
        for (let col = startCol; col <= endCol; col++) {
            results.push(matrix[startRow][col]);
        }

        for (let row = startRow + 1; row <= endRow; row++) {
            results.push(matrix[row][endCol]);
        }

        for (let col = endCol - 1; col >= startCol; col--) {
            if (startRow === endRow) break;
            results.push(matrix[endRow][col]);
        }

        for (let row = endRow - 1; row >= startRow + 1; row--) {
            if (endCol === startCol) break;
            results.push(matrix[row][startCol]);
        }

        startRow++;
        startCol++;
        endRow--;
        endCol--;
    }

    return results;
};
