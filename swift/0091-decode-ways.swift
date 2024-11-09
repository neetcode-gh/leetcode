class Solution {
    func numDecodings(_ s: String) -> Int {
        var s = Array(s)
        var dp: [Int: Int] = [s.count: 1]
        for i in stride(from: s.count - 1, to: -1, by: -1) {
            if s[i] == "0" {
                dp[i] = 0
            } else {
                dp[i] = dp[i + 1]
            }

            if i + 1 < s.count && (s[i] == "1" || s[i] == "2" && "0123456".contains(s[i + 1])) {
                dp[i, default: 0] += dp[i + 2] ?? 0
            }
        }
        return dp[0]!
    }
}