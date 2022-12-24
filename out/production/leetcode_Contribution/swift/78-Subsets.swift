class Solution {
    func subsets(_ nums: [Int]) -> [[Int]] {
        var res : [[Int]] = []
        var subset : [Int] = []
        
        func dfs(_ i: Int) {
            if i >= nums.count {
                res.append(subset)
                return
            }
            // decision to include nums[i]
            subset.append(nums[i])
            dfs(i + 1)
            // decision NOT to include nums[i]
            subset.removeLast()
            dfs(i + 1)
        }
        
        dfs(0)
        return res
    }
}