/**
 * Question Link: https://leetcode.com/problems/combinations/
 */

 class Solution {
    func combine(_ n: Int, _ k: Int) -> [[Int]] {
        var combs = [[Int]]()
        var curComb = [Int]()
        func dfs(_ i: Int) {
            if curComb.count == k {
                combs.append(curComb)
                return
            }
            if i > n {
                return
            }
            for j in i..<n + 1 {
                curComb.append(j)
                dfs(j + 1)
                curComb.popLast()
            }
        }
        dfs(1)
        return combs
    }
}