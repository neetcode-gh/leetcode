func rob(nums []int) int {
    n := len(nums)
    
    if n == 1 {
        return nums[0]
    }
    
    if n == 2 {
        return max(nums[0], nums[1])
    }
    
    return max(robUtil(nums, 0, n-1), robUtil(nums, 1, n))
}

func robUtil(nums []int, st, end int) int {
    dp := make([]int, len(nums))
    dp[st] = nums[st]
    dp[st+1] = max(nums[st], nums[st+1])
    
    for i := st+2; i < end; i++ {
        dp[i] = max(nums[i]+dp[i-2], dp[i-1])
    }
    
    return dp[end-1]
}

func max(a, b int) int {
    if a > b {
        return a
    }
    
    return b
}