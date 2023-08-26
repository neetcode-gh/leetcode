//greedy algorithm O(nlogn)
class Solution {
    fun findLongestChain(_pairs: Array<IntArray>): Int {
        val pairs = _pairs.sortedWith(compareBy({ it[1] }, { it[0] }))

        var res = 1
        var time = pairs[0][1]
        for (i in 1 until pairs.size) {
            if(pairs[i][0] > time) {
                res++
                time = pairs[i][1]
            }
        }

        return res
    }
}

//dp O(n^2)
class Solution {
    fun findLongestChain(_pairs: Array<IntArray>): Int {
        val pairs = _pairs.sortedWith(compareBy({ it[0] }, { it[1] }))
        val n = pairs.size
        val dp = IntArray(n) { 1 }

        for (i in 0 until n) {
            for (j in 0 until n) {
                if (pairs[i][0] > pairs[j][1]) {
                    dp[i] = maxOf(dp[i], dp[j] + 1)
                }
            }
        }

        return dp[n - 1]
    }
}
