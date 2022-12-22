class Solution {
    func moveZeroes(_ nums: inout [Int]) {
        var left = 0
        for right in 0..<nums.count {
            if nums[right] != 0 {
                var temp=nums[left]
                nums[left]=nums[right]
                nums[right]=temp
                left += 1
            }
        }
    }
}
