class Solution {
    func removeDuplicates(_ nums: inout [Int]) -> Int {        
        var l: Int = 0
        var r: Int = 0
        
        while r < nums.count {
            var count: Int = 1
            while r + 1 < nums.count && nums[r] == nums[r + 1] {
                r += 1
                count += 1
            }

            for _ in 0..<min(2, count) {
                nums[l] = nums[r]
                l += 1    
            }

            r += 1
        }

        return l
    }
}
