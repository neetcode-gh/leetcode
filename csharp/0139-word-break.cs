public class Solution
{
    public bool WordBreak(string s, IList<string> wordDict)
    {
        bool[] dp = new bool[s.Length + 1];
        Array.Fill(dp, false);
        dp[s.Length] = true;

        for (int i = s.Length - 1; i >= 0; i--)
        {
            foreach (var w in wordDict)
            {
                if (i + w.Length <= s.Length && s.Substring(i, w.Length) == w)
                    dp[i] = dp[i + w.Length];

                if (dp[i] == true)
                    break;
            }
        }
        return dp[0];
    }
}
