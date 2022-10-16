/**
 * Brute Force - DFS
 * Time O(S^N) | Space O(N)
 * https://leetcode.com/problems/coin-change/
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
 var coinChange = (coins, amount, coin = 0) => {
    const isBaseCase1 = amount === 0;
    if (isBaseCase1) return 0;

    const isBaseCase2 = !((coin < coins.length) && (0 < amount));
    if (isBaseCase2) return -1;

    return dfs(coins, amount, coin);/* Time O(S^N) | Space O(N) */
}

var dfs = (coins, amount, coin) => {
    let [ max, minCost ] = [ (amount / coins[coin]), Infinity ];

    for (let num = 0; num <= max; num++) {/* Time O(N) */
        const caUpdate = ((num * coins[coin]) <= amount);
        if (!caUpdate) continue;

        const product = (num * coins[coin]);
        const difference = amount - product;
        const min = coinChange(coins, difference, (coin + 1));/* Time O(S^N) | Space O(N) */
        const cost = (min + num);

        const isSentinel = (min === -1);
        if (isSentinel) continue;

        minCost = Math.min(minCost, cost);
    }

    return (minCost !== Infinity)
        ? minCost
        : -1;
}

/**
 * DP - Top Down
 * Array - Memoization
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/coin-change/
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
 var coinChange = (coins, amount, memo = initMemo(amount)) => {
    const isBaseCase1 = (amount < 0);
    if (isBaseCase1) return -1;

    const isBaseCase2 = (amount < 1);
    if (isBaseCase2) return 0;

    const isBaseCase3 = (memo[amount - 1] !== 0);
    if (isBaseCase3) return memo[amount - 1];

    return dfs(coins, amount, memo);/* Time O(N) | Space O(N) */
}

const initMemo = (amount) => Array(amount).fill(0);

var dfs = (coins, amount, memo, min = Infinity) => {
    for (const coin of coins) {                               /* Time O(N) */
        const cost = coinChange(coins, (amount - coin), memo);/* Time O(N) | Space O(N) */

        const canUpdate = ((0 <= cost) && (cost < min));
        if (!canUpdate) continue;

        min = (cost + 1);
    }

    memo[amount - 1] = (min !== Infinity)
        ? min
        : -1;

    return memo[amount - 1];
}

/**
 * DP - Bottom Up
 * Array - Tabulation
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/coin-change/
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = (coins, amount) => {
    const tabu = initTabu(amount);

    for (let _amount = 1; _amount <= amount; _amount++) {/* Time O(N) */
        for (let coin = 0; coin < coins.length; coin++) {    /* Time O(N) */
            const canUpdate = (coins[coin] <= _amount);
            if (!canUpdate) continue;

            const difference = (_amount - coins[coin]);
            const min = (tabu[difference] + 1);

            tabu[_amount] = Math.min(tabu[_amount], min);    /* Space O(N) */
        }
    }

    return (tabu[amount] <= amount)
        ? tabu[amount]
        : -1;
}

const initTabu = (amount) => {
    const tabu = Array((amount + 1)).fill((amount + 1));

    tabu[0] = 0;

    return tabu;
}