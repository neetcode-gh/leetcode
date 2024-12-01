/**
 * https://leetcode.com/problems/spiral-matrix-ii/
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    let matrix = Array.from(Array(n),() => Array(n));
    
    let top = 0,bottom = n-1,left = 0,right = n-1;
    let element = 1;

    while(top <= bottom && left <= right){

        for(let i = left;i <= right; i++){
            matrix[top][i] = element++;
        }
        top++;

        for(let i = top;i <= bottom; i++){
            matrix[i][right] = element++;
        }
        right--;

        for(let i = right; i>= left; i--){
            matrix[bottom][i] = element++;
        }
        bottom--;

        for(let i = bottom;i >= top; i--){
            matrix[i][left] = element++;
        }
        left++;
    }
    return matrix;
};

// Runtime: 54 ms, 0.62% of solutions used 54 ms of runtime for spiral matrix ii.
// Memory Usage: 41.9 MB, 7.07% of solutions used 41.9 MB of memory for spiral matrix ii.
