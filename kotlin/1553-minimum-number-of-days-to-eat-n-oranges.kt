// dfs
class Solution {
    fun minDays(n: Int): Int {
        val dp = HashMap<Int, Int>().apply {
            this[0] = 0
            this[1] = 1
        }

        fun dfs(n: Int): Int {
            if (n in dp) return dp[n]!!

            val divByTwo = 1 + (n % 2) + dfs(n / 2)
            val divByThree = 1 + (n % 3) + dfs(n / 3)

            dp[n] = minOf(
                divByTwo,
                divByThree
            )

            return dp[n]!!
        }

        return dfs(n)
    }
}

// Bonus: same as above but with more compact code
class Solution {
    fun minDays(n: Int): Int {
        val dp = HashMap<Int, Int>()

        fun dfs(n: Int): Int {
            if (n <= 1) return n
            
            if (n !in dp) {
                dp[n] = minOf(
                    1 + (n % 2) + dfs(n / 2),
                    1 + (n % 3) + dfs(n / 3)
                )
            }

            return dp[n]!!
        }

        return dfs(n)
    }
}

// bfs
class Solution {
    fun minDays(n: Int): Int {
        val q = LinkedList<Int>().apply { add(n) }
        val visited = HashSet<Int>()
        var days = 1

        while (q.isNotEmpty()) {
            repeat (q.size) {
                val n = q.removeFirst()
                if (n == 1 || n == 0) return days
                if (n !in visited) {
                    visited.add(n)
                    q.addLast(n - 1)
                    if (n % 2 == 0) q.addLast(n / 2)
                    if (n % 3 == 0) q.addLast(n / 3)
                }   
            }
            days++
        }

        return days
    }
}
