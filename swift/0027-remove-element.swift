class Solution {
    func removeElement(_ nums: inout [Int], _ val: Int) -> Int {
        var count: Int = 0

        for i in nums where i != val {
            nums[count] = i
            count += 1
        }
        
        return count
    }
}
