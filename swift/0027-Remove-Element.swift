class Solution {
    func removeElement(_ nums: inout [Int], _ val: Int) -> Int {
        // keep track of the count, init to 0
        var count: Int = 0

        // (for) go through nums
            // if nums[i] !- val
                // set nums[count] = nums[i]
                // increment count by 1
        for i in nums {
            if i != val {
                nums[count] = i
                count += 1
            }
        }
        
        // return count
        return count
    }
}
