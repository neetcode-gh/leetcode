/*
* DP with O(n) memory
*/
class Solution {
    fun change(amount: Int, coins: IntArray): Int {
        val dp = IntArray(amount + 1)

        dp[0] = 1
        for (coin in coins) {
            for (i in 1..amount) {
                if (i - coin >= 0)
                    dp[i] += dp[i - coin]
            }
        }
        
        return dp[amount]
    }
}

/*
* DP with O(n^2) memory
*/
class Solution {
    fun change(amount: Int, coins: IntArray): Int {
        val dp = Array(coins.size) { IntArray(amount + 1) }

        for (i in 0 until coins.size)
            dp[i][0] = 1

        for (i in 0..coins.lastIndex) {
            for (j in 1..amount) {
                if (i > 0) {
                    dp[i][j] += dp[i - 1][j]
                }
                if (j - coins[i] >= 0)
                    dp[i][j] += dp[i][j - coins[i]]
            }
        }

        return dp[coins.lastIndex][amount]
    }
}

/*
* DFS + Memo
*/
class Solution {
    fun change(amount: Int, coins: IntArray): Int {
        val cache = Array(coins.size) { IntArray(amount + 1) {-1} }
        
        fun dfs(i: Int, a: Int): Int {
            if (a == amount)
                return 1
            if (a > amount)
                return 0
            if (i == coins.size)
                return 0
            if (cache[i][a] != -1)
                return cache[i][a]

            cache[i][a] = dfs(i, a + coins[i]) + dfs(i + 1, a)

            return cache[i][a]
        }
 
        return dfs(0, 0)
    }
}
