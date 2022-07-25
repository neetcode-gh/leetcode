class Solution {
    func longestCommonSubsequence(_ text1: String, _ text2: String) -> Int {
        
        var dp = [[Int]](repeating: [Int](repeating: 0, count: text2.count + 1), count: text1.count + 1)
        
        let d1 = Array(text1)
        let d2 = Array(text2)
        
        for i in stride(from: d1.count - 1, to: -1, by: -1) {
            for j in stride(from: d2.count - 1, to: -1, by: -1) {
                if d1[i] == d2[j] {
                    dp[i][j] = 1 + dp[i + 1][j + 1]
                } else {
                    dp[i][j] = max(dp[i][j + 1], dp[i + 1][j])
                }
            }
        }
        
        return dp[0][0]
    }
}
