// Use combinatorics, time O(n) and space O(n)
class Solution {
    fun numberOfWays(corridor: String): Int {
        val mod = 1_000_000_007
        val seats = mutableListOf<Int>()

        for ((i, c) in corridor.withIndex()) {
            if (c == 'S')
                seats.add(i)
        }

        if (seats.size < 2 || seats.size % 2 == 1)
            return 0

        var res = 1L
        var i = 1
        while (i < seats.size - 1) {
            res = (res * (seats[i + 1] - seats[i])) % mod
            i += 2
        }

        return res.toInt()
    }
}

// Use combinatorics, time O(n) and space O(1)
class Solution {
    fun numberOfWays(corridor: String): Int {
        val seats = corridor.count { it == 'S' }
        if (seats < 2 || seats % 2 == 1) return 0

        val mod = 1_000_000_007
        var prev = corridor.indexOfFirst { it == 'S' }
        var seatCount = 1
        var res = 1L

        for (i in prev + 1 until corridor.length) {
            if (corridor[i] == 'S') {
                if (seatCount == 2) {
                    res = (res * (i - prev)) % mod
                    seatCount = 1
                } else {
                    seatCount++
                }
                prev = i
            }
        }

        return res.toInt()
    }
}

// Recursion + memoization, time O(n) and space O(n)
class Solution {
    fun numberOfWays(corridor: String): Int {
        val mod = 1_000_000_007
        val dp = Array (corridor.length) { IntArray (3) { -1 } }

        fun dfs(i: Int, seats: Int): Int {
            if (i == corridor.length)
                return if (seats == 2) 1 else 0
            if (dp[i][seats] != -1) return dp[i][seats]

            var res = 0
            if (seats == 2) {
                if (corridor[i] == 'S')
                    res = dfs(i + 1, 1)
                else
                    res = (dfs(i + 1, 0) + dfs(i + 1, 2)) % mod
            } else {
                if (corridor[i] == 'S')
                    res = dfs(i + 1, seats + 1)
                else
                    res = dfs(i + 1, seats)
            }

            dp[i][seats] = res
            return res
        }

        return dfs(0, 0)
    }
}
