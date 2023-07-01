/**
 * https://leetcode.com/problems/range-sum-query-2d-immutable/
 * @class NumMatrix
 * @param {number[][]} matrix
 */
class NumMatrix {
  constructor(matrix) {
    this.matrix = matrix;
  }

  /** 
   * 
   * m = row2 - row1; n = col2 - col1
   * Time O(m*n) | Space O(1)
   * @param {number} row1 
   * @param {number} col1 
   * @param {number} row2 
   * @param {number} col2
   * @return {number}
   */
  sumRegion(row1, col1, row2, col2) {
    let sum = 0;
    for (let i = row1; i < row2 + 1; i++) {
      for (let j = col1; j < col2 + 1; j++) {
        sum += this.matrix[i][j];
      }
    }
    return sum;
  }
}

/** 
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
