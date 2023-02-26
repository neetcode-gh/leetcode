class Solution {
    fun wiggleSort(nums: IntArray): Unit {
        for (i in 1 .. nums.lastIndex) {
            val prev = nums[i - 1]
            val curr = nums[i]

            when (i % 2) {
                0 -> { if (prev < curr) nums.swap(i) }
                else -> { if (prev > curr) nums.swap(i) }
            }
        }
    }

    private fun IntArray.swap(currentIndex: Int) {
        this[currentIndex - 1] = this[currentIndex].also { 
            this[currentIndex] = this[currentIndex - 1] 
        }
    }
}