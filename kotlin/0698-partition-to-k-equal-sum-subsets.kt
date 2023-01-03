class Solution {
    fun canPartitionKSubsets(nums: IntArray, k: Int): Boolean {
        
        var target = nums.sum()
        if(target%k != 0) return false // we cant divive nums equally by k
        target /= k
        
        
        val used = BooleanArray(nums.size)
        nums.sortDescending()
        
        fun backtrack(i: Int, k: Int, sum: Int): Boolean {
                        
            if(k == 0) return true
            
            if(sum == target) return backtrack(0, k-1, 0)
            
            for(j in i until nums.size){
                if(nums[j] > target) return false
                if(used[j]==true || nums[j]+sum > target) continue
                used[j] = true
                if(backtrack(j+1, k, sum+nums[j]) == true) return true
                used[j] = false
            }
            
            return false
        }
        
        return backtrack(0,k,0)
    }
}
