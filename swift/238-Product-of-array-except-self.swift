class Solution {
    func productExceptSelf(_ nums: [Int]) -> [Int] {
        var res = [Int](repeating: 1, count: nums.count)
        
        var prefix = 1
        for i in 0..<nums.count {
            res[i] = prefix
            prefix *= nums[i]
        }
        var postfix = 1
        for i in stride(from: nums.count-1, to: -1, by: -1) {
            res[i] *= postfix
            postfix *= nums[i]
        }
        return res
    }
}
