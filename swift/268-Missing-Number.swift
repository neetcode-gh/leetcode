class Solution {
    func missingNumber(_ nums: [Int]) -> Int {
        var res = nums.count
        
        for i in 0...nums.count-1 {
            res += i - nums[i]
        }
        return res 
    }
}