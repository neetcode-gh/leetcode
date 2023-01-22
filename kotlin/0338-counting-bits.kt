class Solution {
    fun countBits(n: Int): IntArray {
        var dp = IntArray(n + 1)
        var offset = 1
        
        for (i in 1..n) {
            if (offset * 2 == i) {
                offset = i
            }
            dp[i] = 1 + dp[i - offset]
        }
        return dp
    }
}