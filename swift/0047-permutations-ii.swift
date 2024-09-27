/**
 * Question Link: https://leetcode.com/problems/permutations-ii/
 */

 class Solution {
    func permuteUnique(_ nums: [Int]) -> [[Int]] {
        var res = [[Int]]()
        var perm = [Int]()
        var count = [Int: Int]()
        for n in nums {
            count[n, default: 0] += 1
        }
        func dfs() {
            if perm.count == nums.count {
                res.append(perm)
                return
            }
            for n in count.keys {
                if count[n]! > 0 {
                    perm.append(n)
                    count[n, default: 0] -= 1
                    dfs()
                    count[n, default: 0] += 1
                    perm.popLast()
                }
            }
        }
        dfs()
        return res
    }
}