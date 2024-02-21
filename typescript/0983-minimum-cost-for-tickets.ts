function mincostTickets(days: number[], costs: number[]): number {
    const dp = new Array(days.length + 1);
    dp[dp.length - 1] = 0;

    for (let j = dp.length - 2; j >= 0; j--) {
        const a = costs[0] + dp[j + 1];

        let d = j;
        do {
            d++;
        } while (days[d] < days[j] + 7 && d < dp.length);
        const b = costs[1] + dp[d];

        d = j;
        do {
            d++;
        } while (days[d] < days[j] + 30 && d < dp.length);
        const c = costs[2] + dp[d];
        dp[j] = Math.min(a, b, c);
    }

    return dp[0];
};
