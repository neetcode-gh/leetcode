func missingNumber(nums []int) int {
    res := len(nums)
    
    for i := 0; i < len(nums); i++ {
        res += i - nums[i]
    }
    return res
}