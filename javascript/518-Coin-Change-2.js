/**
 * Brute Force - DFS
 * Time O(2^N) | Space O(N)
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
 var change = (amount, coins, n = (coins.length)) => {
    const isBaseCase1 = (amount === 0);
    if (isBaseCase1) return 1;

    const isBaseCase2 = (n === 0);
    if (isBaseCase2) return 0;

    return dfs(amount, coins, n);/* Time O(2^N) | Space O(N) */
}

var dfs = (amount, coins, n) => {
    const isLess = (amount < coins[(n - 1)]);
    if (isLess) return change(amount, coins, (n - 1));       /* Time O(2^N) | Space O(N) */

    const left = change((amount - coins[(n - 1)]), coins, n);/* Time O(2^N) | Space O(N) */
    const right = change(amount, coins, (n - 1));            /* Time O(2^N) | Space O(N) */

    return (left + right);
}

/**
 * DP - Top Down
 * Matrix - Memoization
 * Time O(N * AMOUNT) | Space O(N * AMOUNT)
 * https://leetcode.com/problems/coin-change-ii/
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = (amount, coins, n = (coins.length), memo = initMemo(coins, amount)) => {
    const isBaseCase1 = (n === 0);
    if (isBaseCase1) return 0;

    const isBaseCase2 = (amount === 0);
    if (isBaseCase2) return 1;

    const hasSeen = (memo[n][amount] !== null);
    if (hasSeen) return memo[n][amount];

    return dfs(amount, coins, n, memo);/* Time O(N * AMOUNT) | Space O((N * AMOUNT) + HEIGHT) */
}

var initMemo = (coins, amount) => new Array(coins.length + 2).fill()
    .map(() => new Array(amount + 2).fill(null));

var dfs = (amount, coins, n, memo) => {
    const isLess = (amount < coins[(n - 1)]);
    if (isLess) {
        memo[n][amount] = change(amount, coins, (n - 1), memo);     /* Time O(N * AMOUNT) | Space O(HEIGHT) */
        return memo[n][amount];
    }

    const left = change((amount - coins[(n - 1)]), coins, n, memo);/* Time O(N * AMOUNT) | Space O(HEIGHT) */
    const right = change(amount, coins, (n - 1), memo);            /* Time O(N * AMOUNT) | Space O(HEIGHT) */

    memo[n][amount] = (left + right);                              /*                    | Space O(N * AMOUNT) */
    return memo[n][amount];
}

/**
 * DP - Bottom Up
 * Array - Tabulation
 * Time O(N * AMOUNT) | Space O(N * AMOUNT)
 * https://leetcode.com/problems/coin-change-ii/
 */
 var change = (amount, coins) => {
    const tabu = initTabu(amount, coins);/* Time O(N * AMOUNT) | Space O(N * AMOUNT) */

    search(amount, coins, tabu);         /* Time O(N * AMOUNT) | Space O(N * AMOUNT) */

    return tabu[coins.length][amount];
}

var initTabu = (amount, coins) => {
    const tabu = new Array((coins.length + 1)).fill()/* Time O(N) | Space O(N) */
        .map(() => new Array((amount + 1)).fill(0));     /* Time O(AMOUNT) | Space O(AMOUNT) */

    tabu[0][0] = 1;                                   /*          | Space O(N * AMOUNT) */

    return tabu;
}

var search = (amount, coins, tabu) => {
    for (let coin = 1; coin <= coins.length; coin++) {   /* Time O(N)*/
        tabu[coin][0] = 1;                                       /* Space O(N * AMOUNT) */

        for (let _amount = 1; _amount <= amount; _amount++) {/* Time O(AMOUNT) */
            tabu[coin][_amount] = tabu[coin - 1][_amount];

            const canUpdate = (0 <= (_amount - coins[(coin - 1)]));
            if (!canUpdate) continue;

            const val = tabu[coin][(_amount - coins[(coin - 1)])];
            tabu[coin][_amount] += val                           /* Space O(N * AMOUNT) */
        }
    }
}

/**
 * DP - Bottom Up
 * Array - Tabulation
 * Time O(N * AMOUNT) | Space O(AMOUNT)
 * https://leetcode.com/problems/coin-change-ii/
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = (amount, coins) => {
    const tabu = initTabu(amount);

    search(amount, coins, tabu);

    return tabu[amount];
};

var initTabu = (amount) => {
    var tabu = new Array((amount + 1)).fill(0);

    tabu[0] = 1;

    return tabu;
}

var search = (amount, coins, tabu) => {
    for (const coin of coins) {
        for (let _amount = 0; (_amount < (amount + 1)); _amount++) {
            const canUpdate = (coin <= _amount);
            if (!canUpdate) continue;

            tabu[_amount] += tabu[(_amount - coin)];
        }
    }
}
