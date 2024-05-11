/**
 * Question Link: https://leetcode.com/problems/subsets-ii/
 */

 class Solution {
    func subsetsWithDup(_ nums: [Int]) -> [[Int]] {
        var subsets = [[Int]]()
        var curSet = [Int]()
        var nums = nums.sorted()

        func dfs(_ i: Int) {
            if i >= nums.count {
                subsets.append(curSet)
                return
            }

            curSet.append(nums[i])
            dfs(i + 1)
            curSet.popLast()

            var i = i
            while i + 1 < nums.count && nums[i] == nums[i + 1] {
                i += 1
            }
            dfs(i + 1)
        }

        dfs(0)
        return subsets
    }
}