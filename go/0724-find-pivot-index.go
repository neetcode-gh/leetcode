func pivotIndex(nums []int) int {
    total := 0
    for _, n := range(nums) {
        total += n
    }
    
    leftSum := 0
    for i := 0; i < len(nums); i++ {
        rightSum := total - nums[i] - leftSum
        if leftSum == rightSum {
            return i
        }
        leftSum += nums[i]
    }
    return -1
}
