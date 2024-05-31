/**
 * Question Link: https://leetcode.com/problems/ones-and-zeroes/
 */

 class Solution {
    func findMaxForm(_ strs: [String], _ m: Int, _ n: Int) -> Int {
        var dp = [[Int]: Int]()

        for s in strs {
            let mCnt = s.filter({ $0 == "0"}).count
            let nCnt = s.filter({ $0 == "1"}).count
            for i in stride(from: m, to: mCnt - 1, by: -1) {
                for j in stride(from: n, to: nCnt - 1, by: -1) {
                    dp[[i, j]] = max(1 + (dp[[i - mCnt, j - nCnt]] ?? 0), dp[[i, j]] ?? 0)
                }
            }
        }

        return dp[[m, n]] ?? 0
    }
}