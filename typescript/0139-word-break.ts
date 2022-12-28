function wordBreak(s: string, wordDict: string[]): boolean {
    const dp = Array(s.length + 1).fill(false);

    dp[s.length] = true;

    for (let i = s.length - 1; i > -1; i--) {
        for (const w of wordDict) {
            if (i + w.length <= s.length && s.slice(i, i + w.length) == w) {
                dp[i] = dp[i + w.length];
            }
            if (dp[i]) {
                break;
            }
        }
    }

    return dp[0];
}
