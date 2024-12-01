/*
* O(nlogn) solution (similar to wiggle sort)
*/
class Solution {
    fun rearrangeArray(nums: IntArray): IntArray {
        nums.sort()

        val res = IntArray(nums.size)
        var i = 0
        var left = 0
        var right = nums.lastIndex

        while (i < res.size) {
            res[i++] = nums[left++]
            if (left <= right)
                res[i++] = nums[right--]
        }

        return res
    }
}

/*
* O(n) solution, check for any increasing/decreasing subarrays at i - i to i + 1, if found i with i + 1 to remove the increasing/decreasing subarray
*/
class Solution {
    fun rearrangeArray(nums: IntArray): IntArray {

        for (i in 1 until nums.lastIndex) {
            if (nums[i - 1] < nums[i] && nums[i] < nums[i + 1] || 
                nums[i - 1] > nums[i] && nums[i] > nums[i + 1])
                nums[i] = nums[i + 1].also { nums[i + 1] = nums[i] }
        }

        return nums
    }
}
