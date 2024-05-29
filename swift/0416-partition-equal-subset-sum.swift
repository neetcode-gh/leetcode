/**
 * Question Link: https://leetcode.com/problems/partition-equal-subset-sum/
 */

 class Solution {
    func canPartition(_ nums: [Int]) -> Bool {
        let sum = nums.reduce(0, +)
        if sum % 2 != 0 {
            return false
        }

        var dp = Set<Int>()
        dp.insert(0)
        let target = sum / 2
        for i in stride(from: nums.count - 1, to: -1, by: -1) {
            var nextDP = Set<Int>()
            for t in dp {
                if t + nums[i] == target {
                    return true
                }
                nextDP.insert(t + nums[i])
                nextDP.insert(t)
            }
            dp = nextDP
        }
        return false
    }
}