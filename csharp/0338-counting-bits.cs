public class Solution {
    public int[] CountBits(int n) {
        var hammingWeights = new int[n+1];
        for (int i = 0; i <= n; i++)
        {
            var binary = Convert.ToString(i, 2);
            var hammingWeight = 0;
            for (int j = 0; j < binary.Length; j++)
            {
                hammingWeight += binary[j] - '0';
            }
            hammingWeights[i] = hammingWeight;
        }
        return hammingWeights;
    }

    // With dp
    public int[] CountBits(int n)
    {
        var dp = new int[n + 1];
        var offset = 1;

        for (int i = 1; i < n + 1; i++)
        {
            if (offset * 2 == i)
            {
                offset = i;
            }

            dp[i] = 1 + dp[i - offset];
        }

        return dp;
    }
}