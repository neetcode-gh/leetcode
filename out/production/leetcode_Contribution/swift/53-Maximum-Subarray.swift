class Solution {
    func maxSubArray(_ nums: [Int]) -> Int {
        var res = nums[0]
        var total = 0
        
        for n in nums {
            total += n
            res = max(res, total)
            if total < 0 {
                total = 0
            }
        }
        return res
    }
}