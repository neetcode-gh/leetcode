object Solution {
    def getConcatenation(nums: Array[Int]): Array[Int] = {
        val n = nums.length
        val ans = new Array[Int](2 * n)
        
        for (i <- 0 until n) {
            ans(i) = nums(i)
            ans(i + n) = nums(i)
        }
        
        ans
    }
}
