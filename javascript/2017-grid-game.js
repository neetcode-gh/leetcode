/**
 * https://leetcode.com/problems/grid-game/
 * Linear
 * Time O(n) | Space O(n)
 * @param {number[][]} grid
 * @return {number}
 */
var gridGame = function(grid) {

    const preSum1 = [0];
    const preSum2 = [0];
    for(let i = 1; i <= grid[0].length; i++) {
        preSum1.push(preSum1[i - 1] + grid[0][i - 1]);
        preSum2.push(preSum2[i - 1] + grid[1][i - 1]);
    }

    let res = Infinity;
    for(let i = 1; i < preSum1.length; i++) {
      const top = preSum1[preSum1.length - 1] - preSum1[i];
      const bottom = preSum2[i -1];
      let secondRobot = Math.max(top, bottom);
      res = Math.min(res, secondRobot);
    }
  
    return res;
};
