/**
 * Question Link: https://leetcode.com/problems/kth-largest-element-in-an-array
 */

class Solution {
    func findKthLargest(_ nums: [Int], _ k: Int) -> Int {
        var minValue = nums.min()!
        var maxValue = nums.max()!
        var count = Array(repeating: 0, count: maxValue - minValue + 1)

        for i in 0..<nums.count {
            count[nums[i] - minValue] += 1
        }

        var remain = k
        for i in stride(from: count.count - 1, to: -1, by: -1) {
            remain -= count[i]
            if remain <= 0 {
                return i + minValue
            }
        }

        return -1
    }
}