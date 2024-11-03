class Solution {
    func lengthOfLIS(_ nums: [Int]) -> Int {
        var dp = [Int](repeating: 1, count: nums.count)
        for i in stride(from: nums.count - 1, to: -1, by: -1) {
            for j in (i + 1)..<nums.count {
                if nums[i] < nums[j] {
                    dp[i] = max(dp[i], 1 + dp[j])
                }
            }
        }
        return dp.max() ?? -1
    }
}