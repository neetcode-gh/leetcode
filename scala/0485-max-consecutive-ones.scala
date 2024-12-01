object Solution {
    def findMaxConsecutiveOnes(nums: Array[Int]): Int =
        nums.scanLeft(0)((m, x) => if (x == 0) 0 else m + 1).max
}