class Solution {
    func moveZeroes(_ nums: inout [Int]) {
        var index: Int = 0

        for num in nums where num != 0 {
            nums[index] = num
            index += 1
        }

        for i in index..<nums.count {
            nums[i] = 0
        }
    }
}
