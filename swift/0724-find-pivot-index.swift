// Time: O(n)
// Space: O(n)

class Solution {
    func pivotIndex(_ nums: [Int]) -> Int {
        var nums = nums
        for i in 1..<nums.count {
            nums[i] += nums[i - 1]
        }

        for i in 0..<nums.count {
            let left = i == 0 ? 0 : nums[i - 1]
            let right = i == nums.count - 1 ? 0 : nums[nums.count - 1] - nums[i]
            if left == right {
                return i
            }
        }

        return -1
    }
}