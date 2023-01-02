func searchInsert(nums []int, target int) int {
    low, high := 0, len(nums)
    for low < high {
        mid := low + (high - low)/2
        if target > nums[mid] {
            low = mid + 1
        } else {
            high = mid
        }
    }
    return low
}
