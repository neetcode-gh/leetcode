object Solution {
    def getConcatenation(nums: Array[Int]): Array[Int] = {
        var ans: Array[Int] = Array()
        for (_ <- 0 until 2) {
            for (n <- nums) {
                ans = ans :+ n
            }
        }
        ans
    }
}