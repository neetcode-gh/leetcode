/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    let row = new Array(matrix.length);
    let col = new Array(matrix[0].length);
    
    for (let i = 0; i < row.length; i++) {
        for (let j = 0; j < col.length; j++) {
            if (matrix[i][j] === 0) {
                row[i] = 0;
                col[j] = 0;
            }
        }
    }
    
    for (let i = 0; i < row.length; i++) {
        for (let j = 0; j < col.length; j++) {
            if (row[i] == 0 || col[j] == 0) {
                matrix[i][j] = 0;
            }
        }
    }
    
};
