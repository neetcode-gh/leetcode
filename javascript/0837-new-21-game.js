/**
 * https://leetcode.com/problems/new-21-game/
 * @param {number} n
 * @param {number} k
 * @param {number} maxPts
 * @return {number}
 */
var new21Game = function(n, k, maxPts) {
  if (k == 0) {
    return 1
  }  

  let windowSum = 0
  for (let i = k; i < k + maxPts; i++) {
    if (i <= n) {
      windowSum += 1
    }
  }

  let dp = {}
  for (let i = k - 1; i >= 0; i--) {
    dp[i] = windowSum / maxPts

    let remove = 0
    if (i + maxPts <= n) {
      remove = dp[i + maxPts] || 1
    }

    windowSum += dp[i]
    windowSum -= remove
  }

  return dp[0]
};