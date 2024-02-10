function minDistance(word1: string, word2: string): number {
    let dp = Array.from({ length: word2.length + 1 }, (_, i) => word2.length - i);

    for (let i = word1.length - 1; i >= 0; i--) {
        const current = new Array(word2.length + 1);
        current[current.length - 1] = dp[current.length - 1] + 1;

        for (let j = word2.length - 1; j >= 0; j--) {
            if (word1[i] === word2[j]) {
                current[j] = dp[j + 1];
            } else {
                current[j] = 1 + Math.min(
                    dp[j],
                    current[j + 1],
                    dp[j + 1],
                );
            }
        }

        dp = current;
    }

    return dp[0];
};
