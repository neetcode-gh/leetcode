class Solution {
    func wordBreak(_ s: String, _ wordDict: [String]) -> Bool {
        var s = Array(s)
        var dp = [Bool](repeating: false, count: s.count + 1)
        dp[s.count] = true

        for i in stride(from: s.count - 1, to: -1, by: -1) {
            for w in wordDict {
                if i + w.count <= s.count && String(s[i..<(i + w.count)]) == w {
                    dp[i] = dp[i + w.count]
                }
                if dp[i] {
                    break
                }
            }
        }

        return dp[0]
    }
}