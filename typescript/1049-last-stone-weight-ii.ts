function lastStoneWeightII(stones: number[]): number {
    const sum = stones.reduce((a, b) => a + b);
    const target = Math.ceil(sum / 2);

    let dp = Array.from({ length: sum + 1 }, (_, i) => {
        return Math.abs(i - (sum - i));
    });

    for (let i = 0; i < stones.length; i++) {
        const current: number[] = Array.from({ length: sum + 1 });
        for (let j = current.length - 1; j >= 0; j--) {
            if (j >= target) {
                current[j] = Math.abs(j - (sum - j));
            } else {
                current[j] = Math.min(
                    dp[j],
                    dp[j + stones[i]],
                );
            }
        }

        dp = current;
    }

    return dp[0];
};
