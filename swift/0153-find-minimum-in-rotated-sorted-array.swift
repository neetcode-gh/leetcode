class Solution {
    func findMin(_ nums: [Int]) -> Int {
        var start = 0
        var end = nums.count - 1
        var min = Int.max
        while start <= end {
            let mid = start + (end - start) / 2
            if min == -1 { min = nums[mid] }
            if nums[mid] < min { min = nums[mid] }
            if nums[mid] > nums[end] {
                start = mid + 1
            } else {
                end = mid - 1
            }
        }
        return min
    }
}
