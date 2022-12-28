class Solution {
    fun numDecodings(s: String): Int {
        val n = s.length
        val dp = IntArray(n+1)
        dp[0] = 1
        dp[1] = if (s[0] == '0') 0 else 1

        for (i in 2..n) {
            val curr = s[i-1] - '0'
            val prev = s[i-2] - '0'
            val num = 10*prev + curr

            if (curr > 0)
                dp[i] += dp[i-1]

            if (num >= 10 && num <= 26)
                dp[i] += dp[i-2]
        }

        return dp[n]
    }
}