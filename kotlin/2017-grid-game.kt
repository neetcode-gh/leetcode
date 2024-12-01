class Solution {
    fun gridGame(grid: Array<IntArray>): Long {
        val n = grid[0].size
        val topPrefix = LongArray(n)
        val botPrefix = LongArray(n)
        
        for (i in 0 until n) {
            topPrefix[i] = grid[0][i].toLong()
            botPrefix[i] = grid[1][i].toLong()
            if (i > 0 ) {
                topPrefix[i] += topPrefix[i - 1] 
                botPrefix[i] += botPrefix[i - 1]
            }
        }

        var res = Long.MAX_VALUE
        for (i in 0 until n) {
            val rob2top = topPrefix[n - 1] - topPrefix[i]
            val rob2bot = if (i > 0) botPrefix[i - 1] else 0L

            val rob2take = maxOf(
                rob2top,
                rob2bot
            )

            res = minOf(
                res,
                rob2take
            )
        }

        return res
    }
}
