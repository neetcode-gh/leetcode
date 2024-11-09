class Solution(object):
    def isMatch(self, s, p):
        dp = [[False] * (len(p) + 1) for _ in range(len(s) + 1)]
        dp[-1][-1] = True
        for i in range(len(s), -1, -1):
            for j in range(len(p) - 1, -1, -1):
                if p[j] == '*':
                    dp[i][j] = dp[i][j + 1] or (i < len(s) and dp[i + 1][j])
                else:
                    dp[i][j] = i < len(s) and (p[j] == s[i] or p[j] == '?') and dp[i + 1][j + 1]
        return dp[0][0]
