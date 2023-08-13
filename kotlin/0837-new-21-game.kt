class Solution {
    fun new21Game(n: Int, k: Int, maxPts: Int): Double {
        if (k == 0 || k + maxPts <= n)
            return 1.0

        val dp = DoubleArray(k + maxPts)
        var windowSum = 0.0

        for (i in k until (k + maxPts))
            windowSum += if (i <= n) 1.0 else 0.0

        for (i in k - 1 downTo 0) {
            dp[i] = windowSum / maxPts
            windowSum += dp[i]
            if (i + maxPts <= n) {
                windowSum -= if (dp[i + maxPts] != 0.0) dp[i + maxPts] else 1.0
            }
        }

        return dp[0]
    }
}
