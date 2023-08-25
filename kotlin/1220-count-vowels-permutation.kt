//DP
class Solution {
    fun countVowelPermutation(n: Int): Int {
        val mod = 1_000_000_000 + 7
        val dp = Array (n + 1) { LongArray (5) }
        
        for (j in 0 until 5) 
            dp[1][j] = 1

        val a = 0
        val e = 1
        val i = 2
        val o = 3
        val u = 4

        for (j in 2..n) {
            dp[j][a] = 0L + (dp[j - 1][e] + dp[j - 1][i] + dp[j - 1][u]) % mod
            dp[j][e] = 0L + (dp[j - 1][a] + dp[j - 1][i]) % mod
            dp[j][i] = 0L + (dp[j - 1][e] + dp[j - 1][o]) % mod
            dp[j][o] = 0L + (dp[j - 1][i]) % mod
            dp[j][u] = 0L + (dp[j - 1][i] + dp[j - 1][o]) % mod
        }

        return (dp[n].sum()!! % mod).toInt()
    }
}

//recursion + memoization
class Solution {
    fun countVowelPermutation(n: Int): Int {
        val mod = 1_000_000_000 + 7
        val dp = Array (n) { IntArray (5) { -1 } }

        val a = 0
        val e = 1
        val i = 2
        val o = 3
        val u = 4

        val follow = mapOf(
            a to listOf(e),
            e to listOf(a, i),
            i to listOf(a, e, o, u),
            o to listOf(i, u),
            u to listOf(a)
        )

        fun dfs(idx: Int, prev: Int): Int {
            if (idx == n) return 1
            if (dp[idx][prev] != -1) return dp[idx][prev]
        
            var res = 0
            follow[prev]?.forEach {
                res = (res + dfs(idx + 1, it)) % mod
            }

            dp[idx][prev] = res
            return res
        }

        var res = 0
        follow.keys.forEach {
            res = (res + dfs(1, it)) % mod
        }

        return res
    }
}
