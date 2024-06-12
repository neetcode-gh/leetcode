/**
 * Question Link: https://leetcode.com/problems/longest-palindromic-subsequence/
 */

 class Solution {
    func longestPalindromeSubseq(_ s: String) -> Int {
        let s = Array(s)
        let n = s.count
        var dp = Array(repeating: 0, count: n)
        var dpPrev = Array(repeating: 0, count: n)

        for i in stride(from: s.count - 1, to: -1, by: -1) {
            dp[i] = 1
            for j in i + 1..<n {
                if s[i] == s[j] {
                    dp[j] = dpPrev[j - 1] + 2
                } else {
                    dp[j] = max(dpPrev[j], dp[j - 1])
                }
            }
            dpPrev = dp
        }

        return dp[n - 1]
    }
}