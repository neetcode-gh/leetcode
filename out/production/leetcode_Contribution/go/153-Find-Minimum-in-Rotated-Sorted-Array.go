func findMin(nums []int) int {
    res := nums[0]
    l, r := 0, len(nums)-1
    
    for l <= r {
        p := (l+r) / 2
        if nums[p] >= nums[0] {
            l = p+1
        } else {
            if nums[p] < res {
                res = nums[p]
            }
            r = p-1
        }
    }
    
    return res
}
