/**
 * Question Link: https://leetcode.com/problems/interleaving-string/
 */

class Solution {
    func isInterleave(_ s1: String, _ s2: String, _ s3: String) -> Bool {
        let s1 = Array(s1), s2 = Array(s2), s3 = Array(s3)
        if s3.count != s1.count + s2.count {
            return false
        }
        var dp = Array(repeating: false, count: s2.count + 1)
        for i in 0..<s1.count + 1 {
            for j in 0..<s2.count + 1 {
                if i == 0 && j == 0 {
                    dp[j] = true
                } else if i == 0 {
                    dp[j] = dp[j - 1] && s2[j - 1] == s3[i + j - 1]
                } else if j == 0 {
                    dp[j] = dp[j] && s1[i - 1] == s3[i + j - 1]
                } else {
                    dp[j] = (dp[j] && s1[i - 1] == s3[i + j - 1]) || (dp[j - 1] && s2[j - 1] == s3[i + j - 1])
                }
            }
        }
        return dp[s2.count]
    }
}