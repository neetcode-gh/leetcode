class Solution {
    func findDuplicate(_ nums: [Int]) -> Int {
        var slow = 0, fast = 0
        while true {
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast {
                break
            }
        }
        
        var slow2 = 0
        while true {
            slow = nums[slow]
            slow2 = nums[slow2] 
            if slow == slow2 {
                return slow
            }
        }
    }
}