/**
 * Question Link: https://leetcode.com/problems/distinct-subsequences/
 */

 class Solution {
    func numDistinct(_ s: String, _ t: String) -> Int {
        let s = Array(s), t = Array(t)
        let m = s.count, n = t.count
        var dp = Array(repeating: 0.0, count: n)
        for i in stride(from: m - 1, to: -1, by: -1) {
            var prev = 1.0
            for j in stride(from: n - 1, to: -1, by: -1) {
                let oldDPJ = dp[j]
                if s[i] == t[j] {
                    dp[j] += prev
                }
                prev = oldDPJ
            }
        }

        return Int(dp[0])
    }
}