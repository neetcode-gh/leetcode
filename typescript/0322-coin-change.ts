function coinChange(coins: number[], amount: number): number {
    const dp = Array(amount + 1).fill(amount + 1);

    dp[0] = 0;

    for (let a = 1; a < amount + 1; a++) {
        for (const c of coins) {
            if (a - c >= 0) {
                dp[a] = Math.min(dp[a], 1 + dp[a - c]);
            }
        }
    }

    return dp[amount] != amount + 1 ? dp[amount] : -1;
}
