//////////////////////////////////////////////////////////////////////////////
// Dynamic Programming
// Time: O(n*m)
// Space: O(n*m)
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function minDistance(word1, word2) {
  const len1 = word1.length;
  const len2 = word2.length;

  if (!len1 || !len2) {
    return len1 || len2;
  }

  const dp = new Array(len1 + 1).fill().map(() => new Array(len2 + 1));

  for (let i = 0; i <= len1; ++i) {
    dp[i][0] = i;
  }
  for (let i = 0; i <= len2; ++i) {
    dp[0][i] = i;
  }

  for (let i = 1; i <= len1; ++i) {
    for (let j = 1; j <= len2; ++j) {
      const a = dp[i - 1][j] + 1;
      const b = dp[i][j - 1] + 1;
      const c =
        word1[i - 1] === word2[j - 1] ? dp[i - 1][j - 1] : dp[i - 1][j - 1] + 1;
      dp[i][j] = Math.min(a, b, c);
    }
  }

  return dp[len1][len2];
}
