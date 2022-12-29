class Solution {
    fun canPartition(nums: IntArray): Boolean {
        
        var sum = nums.sum()
        if(sum%2 != 0) return false // we cant divive an odd sum into 2 equal parts
        
        val dp = BooleanArray(sum+1)
        sum /= 2
        dp[0] = true
        
        for(num in nums){
            if(num > sum)
                return false
            for(i in sum downTo 0){
                if(i >= num)
                    dp[i] = dp[i] || dp[i-num]
            }
        }
        
        return dp[sum]
    }
    
}
