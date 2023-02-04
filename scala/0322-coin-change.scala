object Solution {
    def coinChange(coins: Array[Int], amount: Int): Int = {
        var dp: Array[Int] = List.fill[Int](amount+5)(amount+1).toArray
        dp(0) = 0
        for(i <- 1 to amount)
        {
            for(j <- 0 until coins.size)
            {
                if(coins(j) <= i)
                {
                    dp(i) = dp(i) min (dp(i - coins(j)) + 1)
                }
            }
        }
        if(dp(amount) > amount ) -1 else dp(amount);
    }
}