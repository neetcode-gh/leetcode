class Solution {
    // Easy solution
    /*
    fun search(nums: IntArray, target: Int): Int {
        return nums.indexOf(target)
    }
    */
    
    // Recursive solution
    fun search(nums: IntArray, target: Int): Int {
        return searchAux(nums, target, 0, nums.size - 1)
    }

    private fun searchAux(nums: IntArray, target: Int, begin: Int, end: Int): Int {
        if (begin > end) return -1
        
        val mid: Int = (begin + end) / 2
        
        return if (nums[mid] == target) mid
        else if (nums[mid] > target) searchAux(nums, target, begin, mid - 1)
        else searchAux(nums, target, mid + 1, end)
    }
}
