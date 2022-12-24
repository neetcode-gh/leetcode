class Solution {
    func maxProduct(_ nums: [Int]) -> Int {
        var res = nums[0]
        var curMin = 1
        var curMax = 1
        
        for n in nums {
            let temp = curMax * n
            curMax = max(n * curMax, n * curMin, n)
            curMin = min(temp, n * curMin, n)
            res = max(res, curMax)
        }
        return res
    }
}