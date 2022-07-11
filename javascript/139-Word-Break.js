let wordBreak = function (s, wordDict) {
  let dp = new Array(s.length + 1);
  dp.fill(false);
  dp[s.length] = true;

  let word = '';
  for (let i = s.length - 1; i >= 0; i--) {
    word = s[i] + word;

    if (wordDict.includes(word) && i + word.length < dp.length) {
      dp[i] = dp[i + word.length];
      word = '';
    } else {
      dp[i] = false;
    }
  }

  return dp[0];
};
