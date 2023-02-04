class Solution {
    fun checkPossibility(nums: IntArray): Boolean {
        var modified = false
        for(i in 0 until nums.size-1){
            if(nums[i+1] < nums[i]) {
                if(modified) return false
                if(i == 0 || nums[i+1] >= nums[i-1]) nums[i] = nums[i+1]
                else nums[i+1] = nums[i]
                modified = true
            }
        }
        return true
    }
}
