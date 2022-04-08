var longestCommonSubsequence = function (text1, text2) {
  let m = text1.length;
  let n = text2.length;

  let table = new Array(m + 1).fill().map(() => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1.charAt(i - 1) !== text2.charAt(j - 1)) {

        table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
      } else {
        table[i][j] = table[i - 1][j - 1] + 1;
      }
    }
  }
  return table[m][n];
};