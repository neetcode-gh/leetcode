/**
 * Question Link: https://leetcode.com/problems/squares-of-a-sorted-array/
 */

 class Solution {
    func sortedSquares(_ nums: [Int]) -> [Int] {
        var res = [Int]()
        var l = 0
        var r = nums.count - 1
        while l <= r {
            if nums[l] * nums[l] > nums[r] * nums[r] {
                res.append(nums[l] * nums[l])
                l += 1
            } else {
                res.append(nums[r] * nums[r])
                r -= 1
            }
        }
        return res.reversed()
    }
}