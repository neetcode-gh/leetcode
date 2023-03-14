object Solution {
    def minCostClimbingStairs(cost: Array[Int]): Int = {
        val n = cost.length
        var first = cost(0)
        var second = cost(1)
        if (n<=2)
            first min second
        else {
            for ( i <- 2 until n) {
                val curr = cost(i) + (first min second)
                first = second
                second = curr
            }
            first min second
        }
    }
}