/*
* DP solution
*/
class Solution {
    fun integerBreak(n: Int): Int {
        val cache = IntArray(n + 1) {-1}

        cache[1] = 1
        for (num in 2..n) {
            cache[num] = if (num == n) 0 else num
            for (i in 1..num) {
                val res = cache[i] * cache[num - i]
                cache[num] = maxOf(cache[num], res)
            }
        }
        
        return cache[n]
    }
}

/*
* DFS + memoization solution
*/
class Solution {
    fun integerBreak(n: Int): Int {
        val cache = IntArray(n + 1) {-1}

        fun dfs(num: Int): Int {
            if (cache[num] != -1) return cache[num]

            cache[num] = if (num == n) 0 else num
            for (i in 1 until num) {
                val res = dfs(i) * dfs(num - i)
                cache[num] = maxOf(cache[num], res)
            }

            return cache[num]
        }

        return dfs(n)
    }
}
