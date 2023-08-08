/**
 * @param {number[][]} mat
 * @return {number}
 */
var diagonalSum = function (mat) {
    let sum = 0; // initialize sum to zero
    let n = mat.length - 1; // initialize n to mat length - 1
    for (let i = 0; i <= n; i++) { // loop through to 0 to n
        sum += mat[i][i]; // add mat[i][i] to sum
        if (i !== (n - i)) { // if i not equal to n - i then add mat[i][n - i] to sum
            sum += mat[i][n - i];
        }
    }
    return sum; // return sum;
};