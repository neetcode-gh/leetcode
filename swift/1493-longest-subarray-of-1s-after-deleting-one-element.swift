class Solution {
    func longestSubarray(_ nums: [Int]) -> Int {
        var zeroCount = 0
        var res = 0
        var l = 0

        for r in 0..<nums.count {
            if nums[r] == 0 {
                zeroCount += 1
            }
            while zeroCount > 1 {
                if nums[l] == 0 {
                    zeroCount -= 1
                }
                l += 1
            }
            res = max(res, r - l)
        }

        return res
    }
}