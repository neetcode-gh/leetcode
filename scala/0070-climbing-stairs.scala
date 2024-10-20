object Solution {
    def climbStairs(n: Int): Int = {
        var one = 1
        var two = 1
        for (i <- 0 until n - 1) {
            val temp = one
            one = one + two
            two = temp
        }
        one
    }
}
