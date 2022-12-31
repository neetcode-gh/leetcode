class Solution {
    func jump(_ nums: [Int]) -> Int {
        var left = 0, right = 0
        var res = 0
        
        while right < nums.count - 1 {
            var maxJump = 0
            for i in left...right {
                maxJump = max(maxJump, i + nums[i])
            }
            left = right + 1
            right = maxJump
            res += 1
        }
        return res
    }
}