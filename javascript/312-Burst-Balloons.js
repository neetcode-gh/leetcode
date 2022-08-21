/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function(nums) {
    var vals = [1, ...nums, 1];
    var n = nums.length;
    var dp = [...Array(n + 2)].map(() => Array(n + 2).fill(0));
    for (var len = 1; len <= n; len++) {
        for (var i = 1; i + len <= n + 1; i++) {
            var j = i + len - 1;
            for (var k = i; k <= j; k++) {
                dp[i][j] = Math.max(
                    dp[i][j],
                    dp[i][k - 1] + vals[i - 1] * vals[k] * vals[j + 1] + dp[k + 1][j],
                );
            }
        }
    }
    
    return dp[1][n];
};
