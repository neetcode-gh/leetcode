public class Solution
{
    //T: O(N^2), S: O(N^2)
    public int MinDistance(string word1, string word2)
    {
        //Bottom up
        var m = word1.Length;
        var n = word2.Length;
        var dp = new int[m + 1, n + 1];

        for (var i = 0; i < m + 1; i++)
        {
            dp[i, n] = m - i;
        }
        for (var j = 0; j < n + 1; j++)
        {
            dp[m, j] = n - j;
        }

        for (var i = m - 1; i >= 0; i--)
        {
            for (var j = n - 1; j >= 0; j--)
            {
                if (word1[i] == word2[j])
                    dp[i, j] = dp[i + 1, j + 1];
                else
                    dp[i, j] = 1 + Math.Min(Math.Min(dp[i + 1, j + 1], dp[i + 1, j]), dp[i, j + 1]); //Replace, Delete, Insert
            }
        }

        return dp[0, 0];
    }

}