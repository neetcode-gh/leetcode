class Solution {
    fun removeDuplicates(nums: IntArray): Int {
        var last = 0
        var i = 0
        while(i < nums.size) { 
            var j = i
            while(j < nums.size && nums[i] == nums[j]) j++
            nums[last++] = nums[i]
            i = j
        }
        return last
    }
}
