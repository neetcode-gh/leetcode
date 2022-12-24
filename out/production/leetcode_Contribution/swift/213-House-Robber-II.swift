class Solution {
    func rob(_ nums: [Int]) -> Int {
        let size = nums.count
        
        if size == 1 {
            return nums[0]
        }
        
        let range1 = robber(nums, 0, size - 2)
        let range2 = robber(nums, 1, size - 1)
        
        return max(range1, range2)
    }
    
    func robber(_ nums: [Int], _ start: Int, _ end: Int) -> Int {
        var prev = 0
        var curr = 0
        var next = 0
        
        for i in start...end {
            next = max(prev + nums[i], curr)
            prev = curr
            curr = next
        }
        return curr
    }
}