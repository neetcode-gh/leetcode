function findMaxForm(strs: string[], m: number, n: number): number {
    const data = strs.reduce((accum, str) => {
        let zeroes = 0;
        for (let c of str) {
            if (c === '0') zeroes++;
        }
        accum.push([zeroes, str.length - zeroes]);
        return accum;
    }, [] as [number, number][]);

    const dp = Array
        .from({ length: m + 1 }, () => new Array(n + 1));

    for (let i = 0; i < data.length; i++) {
        const [zeroes, ones] = data[i];

        for (let j = m; j >= 0; j--) {
            for (let k = n; k >= 0; k--) {
                if (dp[j][k] === undefined) dp[j][k] = 0;

                if (j >= zeroes && k >= ones) {
                    dp[j][k] = Math.max(
                        1 + (dp[j - zeroes][k - ones] ?? 0),
                        dp[j][k],
                    );
                }
            }
        }
    }

    return dp[m][n];
};
