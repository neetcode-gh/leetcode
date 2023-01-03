class Solution {
    func removeDuplicates(_ nums: inout [Int]) -> Int {
        var left: Int = 0

        for right in 1..<nums.count {
            if nums[right] != nums[left] {
                left += 1
                nums[left] = nums[right]
            }
        }
        
        return left + 1
    }
}
