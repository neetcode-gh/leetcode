/**
 * Question Link: https://leetcode.com/problems/shortest-common-supersequence/
 */

 class Solution {
    func shortestCommonSupersequence(_ str1: String, _ str2: String) -> String {
        let str1 = Array(str1), str2 = Array(str2)
        let n = str1.count
        let m = str2.count
        var dp = Array(repeating: Array(repeating: 0, count: m + 1), count: n + 1)

        for i in stride(from: n - 1, to: -1, by: -1) {
            for j in stride(from: m - 1, to: -1, by: -1) {
                if str1[i] == str2[j] {
                    dp[i][j] = 1 + dp[i + 1][j + 1]
                } else {
                    dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])
                }
            }
        }

        var i = 0
        var j = 0
        var res = ""
        while i < n && j < m {
            if dp[i + 1][j] == dp[i][j] {
                res.append(str1[i])
                i += 1
            } else if dp[i][j + 1] == dp[i][j] {
                res.append(str2[j])
                j += 1
            } else {
                res.append(str2[j])
                i += 1
                j += 1
            }
        }

        return res + String(str1[i...]) + String(str2[j...])
    }
}