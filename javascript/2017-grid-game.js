/**
 * Submission Details: 
 * https://leetcode.com/problems/grid-game/
 * Time O(n), Space O(1)
 * Runtime: 89ms (beats 79.31%) || 53.5mb (beats 89.66%)
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */

var gridGame = function(grid) {
    let one = grid[0].reduce((a,b)=>a+b) - grid[0][0];
    let two = 0;
    let res = one;
    for(let i = 1; i < grid[0].length; i++){
        one-=grid[0][i];
        two+=grid[1][i-1];
        res = Math.min(res, Math.max(one,two));
    }
    return res;
};