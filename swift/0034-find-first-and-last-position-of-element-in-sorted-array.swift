class Solution {
    func searchRange(_ nums: [Int], _ target: Int) -> [Int] {
        let left = binSearch(nums, target, true)
        let right = binSearch(nums, target, false)
        return [left, right]
    }
    
    func binSearch(_ nums: [Int], _ target: Int, _ leftBias: Bool) -> Int {
        var left = 0, right = nums.count - 1
        var i = -1
        while left <= right {
            let mid = (left + right) / 2
            if target > nums[mid] {
                left = mid + 1
            }
            else if target < nums[mid] {
                right = mid - 1
            }
            else {
                i = mid
                if leftBias {
                    right = mid - 1
                }
                else {
                    left = mid + 1
                }
            }
        }
        return i
    }
}