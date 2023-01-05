func numDecodingsMemoization(s string) int {
    dp := make([]int, len(s) + 1)
    dp[len(s)] = 1
    
    var dfs func(i int) int
    dfs = func(i int) int {
        if dp[i] != 0 {
            return dp[i]
        } else if s[i] == '0' {
            return 0
        }
        
        res := dfs(i + 1)
        if i + 1 < len(s) && (
            s[i] == '1' || s[i] == '2' && (s[i + 1] >= '0' && s[i + 1] <= '6')) {
            res += dfs(i + 2)
        }
        dp[i] = res
        return res
    }
    
    return dfs(0)
}

func numDecodingsTabulation(s string) int {
    dp := make([]int, len(s) + 1)
    dp[len(s)] = 1
    for i := len(s) - 1; i >= 0; i-- {
        if s[i] == '0' {
            dp[i] = 0
        } else {
            dp[i] = dp[i + 1]
        }
        
        if i + 1 < len(s) && (
            s[i] == '1' || s[i] == '2' && (s[i + 1] >= '0' && s[i + 1] <= '6')) {
            dp[i] += dp[i + 2]
        }
    }
    return dp[0]
}
