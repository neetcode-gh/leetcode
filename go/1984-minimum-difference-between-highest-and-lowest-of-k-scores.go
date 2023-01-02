func minimumDifference(nums []int, k int) int {
    sort.Ints(nums)
    l := 0
    r := k - 1
    res := math.MaxInt32
    
    for r < len(nums) {
        res = min(res, nums[r] - nums[l])
        l = l + 1
        r = r + 1
    }
    return res
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
