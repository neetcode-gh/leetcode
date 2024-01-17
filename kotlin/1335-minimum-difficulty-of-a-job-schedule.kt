class Solution {
    fun minDifficulty(jobDifficulty: IntArray, d: Int): Int {
        if (jobDifficulty.size < d) return -1

        val cache = HashMap<String, Int>()

        fun dfs(i: Int, d: Int, curMax: Int): Int {
            if (i == jobDifficulty.size) {
                return if (d == 0) 0 else INFINITY
            }
            if (d == 0) return INFINITY
            cache["$i:$d:$curMax"]?.let { return it }

            var max = maxOf(curMax, jobDifficulty[i])
            var res = minOf(
                dfs(i + 1, d, max),
                max + dfs(i + 1, d - 1, -1)
            )

            cache["$i:$d:$max"] = res
            return res
        }

        return dfs(0, d, -1)
    }

    companion object {
        const val INFINITY = 400000
    }
}
