class Solution {
    fun shuffle(nums: IntArray, n: Int): IntArray {

        val res = IntArray(2 * n)
        var firstHalf = 0
        var secondHalf = n        
        
        for (i in 0 until 2*n) {
            if (i % 2 == 0) {
                res[i] = nums[firstHalf++]
            } else {
                res[i] = nums[secondHalf++]
            }
        }

        return res
    }
}
