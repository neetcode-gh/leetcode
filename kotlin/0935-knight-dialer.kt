// Alternative solution
class Solution {
    fun knightDialer(n: Int): Int {
        if (n == 1) return 10

        val mod = 1_000_000_007
        var moves = longArrayOf(1L, 4L, 2L, 2L)

        for(i in 0 until n - 1) {
            val temp = LongArray (4)
            temp[0] = moves[3]
            temp[1] = (2 * moves[2] + 2 * moves[3]) % mod
            temp[2] = moves[1]
            temp[3] = (2 * moves[0] + moves[1]) % mod
            moves = temp
        }
       
        var sum = 0L
        for (num in moves) {
            sum += num
            sum %= mod
        }

        return sum.toInt()
    }
}

// DP
class Solution {
    fun knightDialer(n: Int): Int {
        val mod = 1_000_000_007
        val moves = mapOf(
            1 to listOf(6, 8),
            2 to listOf(7, 9),
            3 to listOf(4, 8),
            4 to listOf(3, 9, 0),
            5 to listOf(),
            6 to listOf(1, 7, 0),
            7 to listOf(2, 6),
            8 to listOf(1, 3),
            9 to listOf(4, 2),
            0 to listOf(4, 6)
        )

        var dp = LongArray (10) { 1 }
        for (i in 0 until (n - 1)) {
            val nextDP = LongArray (10)
            for (n in 0 until 10) {
                moves[n]?.forEach { j ->
                    nextDP[j] = (nextDP[j] + dp[n]) % mod
                }
            }
            dp = nextDP
        }

        var sum = 0L
        for (num in dp) {
            sum += num
            sum %= mod
        }

        return sum.toInt()
    }
}

// recursion + memoization
class Solution {
    fun knightDialer(n: Int): Int {
        val mod = 1_000_000_007
        val moves = mapOf(
            1 to listOf(6, 8),
            2 to listOf(7, 9),
            3 to listOf(4, 8),
            4 to listOf(3, 9, 0),
            5 to listOf(),
            6 to listOf(1, 7, 0),
            7 to listOf(2, 6),
            8 to listOf(1, 3),
            9 to listOf(4, 2),
            0 to listOf(4, 6)
        )

        val dp = Array (n + 1) { LongArray (10) { -1L } }

        fun dfs(n: Int, num: Int): Long {
            if (n == 0) return 1
            if (dp[n][num] != -1L) return dp[n][num]

            var res = 0L
            moves[num]?.forEach { next -> 
                res += dfs(n - 1, next)
                res %= mod
            }

            dp[n][num] = res
            return res
        }

        var res = 0L
        for (num in 0..9) {
            res += dfs(n - 1, num)
            res %= mod
        }

        return res.toInt()
    }
}
