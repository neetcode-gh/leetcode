func coinChange(coins []int, amount int) int {
    
      dp := make(map[int]int)
    
      dp[0] = 0
    
      for amt:= 1; amt <= amount; amt++ {
        dp[amt] = 9999999
        for _, coin := range coins {
          if amt >= coin {
              if _, ok := dp[amt-coin]; !ok {
                  dp[amt-coin] = 9999999
              } else if 1+dp[amt-coin] < dp[amt] {
              dp[amt] = 1+dp[amt-coin]
            }
          }
        }
      }
    
    if dp[amount] == 9999999 {
        return -1
      }
      return dp[amount]
}
