//////////////////////////////////////////////////////////////////////////////
// Two level Binary search
// Time: O(log(m) + log(n))  Space: O(1)
//////////////////////////////////////////////////////////////////////////////
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    let [rows, cols] = [matrix.length, matrix[0].length];
    let [top, bot] = [0, rows-1];
    
    while(top <= bot){
        let row = Math.floor((top +  bot) / 2);
        if(target > matrix[row][cols-1]) {
            top = row + 1;
        } else if(target < matrix[row][0]) {
            bot = row - 1; 
        } else {
            break;
        }
    }
    
    if(!(top <= bot)) {
        return false;
    }
    
    let row = Math.floor((top + bot) / 2);
    let [l, r] = [0, cols-1];
    while(l<=r){
        let m = Math.floor((l + r) /2);
        if(target > matrix[row][m]) {
            l = m +1;
        } else if(target < matrix[row][m]) {
            r = m - 1;
        } else if(target == matrix[row][m]) {
            return true;
        }
    }
    return false;
};

//////////////////////////////////////////////////////////////////////////////
// Single Binary Search
// Time: O(log(mn))  Space: O(1)
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {number[][]} matrix
 * @param {number} target
 * Time O(log(ROWS * COLS)) | Space O(1)
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    const [rows, cols] = [matrix.length, matrix[0].length];
    let [left, right] = [0, rows * cols - 1];

    while (left <= right) {
        const mid = (left + right) >> 1;
        const [row, col] = [Math.floor(mid / cols), mid % cols];
        const guess = matrix[row][col];

        const isTarget = guess === target;
        if (isTarget) return true;

        const isTargetGreater = guess < target;
        if (isTargetGreater) left = mid + 1;

        const isTargetLess = target < guess;
        if (isTargetLess) right = mid - 1;
    }

    return false;
};
