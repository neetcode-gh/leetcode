class Solution {
    fun bestTeamScore(scores: IntArray, ages: IntArray): Int {
        val n = scores.size

        val pairs = scores.zip(ages).sortedWith(
            compareBy({it.first}, {it.second})
        )

        val dp = IntArray (n).apply {
            for ((i, v) in pairs.withIndex()) 
                this[i] = v.first
        }

        for (i in 0 until n) {
            val (score, age) = pairs[i]
            for (j in 0 until i) {
                val (score2, age2) = pairs[j]
                if (age >= age2) {
                    dp[i] = maxOf(dp[i], score + dp[j])
                }
            }
        }

        return dp.max() ?: 0
    }
}
