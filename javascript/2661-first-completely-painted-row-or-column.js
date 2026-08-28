/**
 * HashMap | Counting
 * Time O(n*m) | Space O(n*m)
 * https://leetcode.com/problems/first-completely-painted-row-or-column
 * @param {number[]} arr
 * @param {number[][]} mat
 * @return {number}
 */
var firstCompleteIndex = function(arr, mat) {
    
    const rowsProgress = {};
    const colsProgress = {};
    const valToCell = {};
    const ROW = mat.length;
    const COL = mat[0].length;

    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {

            const val = mat[i][j];
            valToCell[val] = {
                row: i,
                col: j
            };
        }
    }

    for (let i = 0; i < arr.length; i++) {
        const val = arr[i];

        const {row, col} = valToCell[val];
        
        rowsProgress[row] = (rowsProgress[row] && rowsProgress[row]+1) || 1;
        colsProgress[col] = (colsProgress[col] && colsProgress[col]+1) || 1;

        if (rowsProgress[row] === COL) return i;
        if (colsProgress[col] === ROW) return i;
    }
};
