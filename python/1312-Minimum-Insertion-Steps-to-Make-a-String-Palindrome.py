def ans(s , i , j ,dp):
    if(i > j ):
        return 0 
    if(dp[i][j]!= -1):
        return dp[i][j]
    if(s[i]== s[j]):
        dp[i][j] = ans(s, i+1, j-1,dp)
        return dp[i][j]
    dp[i][j]=  1+min(ans(s, i+1,j,dp), ans(s, i, j-1,dp))
    return dp[i][j]
class Solution(object):
    def minInsertions(self, s):
        dp = [[-1]*len(s) for i in range(len(s))]
        return ans(s, 0 , len(s)-1, dp)
