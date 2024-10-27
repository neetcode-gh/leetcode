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

//recursion + memoization O(n^2)
class Solution {
    fun findLongestChain(_pairs: Array<IntArray>): Int {
        val pairs = _pairs.sortedWith(compareBy({ it[0] }, { it[1] }))
        val dp = IntArray (pairs.size) { -1 }
        
        fun dfs(i: Int): Int {
            if (i == pairs.size) return 0
            if (dp[i] != -1) return dp[i]

            var res = 1
            for (j in 0 until i) {
                if (pairs[i][0] > pairs[j][1])
                    res = maxOf(res, dfs(j) + 1)
            }

            dp[i] = res
            return res
        }
        
        var res = 1
        for (i in 0 until pairs.size)
            res = maxOf(res, dfs(i))
        
        return res
    }
}
