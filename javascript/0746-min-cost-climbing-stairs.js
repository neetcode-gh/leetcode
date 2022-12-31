/**
 * DP - Top Down
 * Hash Map - Memoization
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/min-cost-climbing-stairs/
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = (cost, i = cost.length, memo = new Map()) => {
    const isBaseCase = i <= 1;
    if (isBaseCase) return 0;

    if (memo.has(i)) return memo.get(i);;

    const [ prev, prevPrev ] = [ (i - 1), (i - 2) ];
    const downOne = minCostClimbingStairs(cost, prev, memo) + cost[prev];        /* Time O(N) | Space O(N) */
    const downTwo = minCostClimbingStairs(cost, prevPrev, memo) + cost[prevPrev];/* Time O(N) | Space O(N) */

    memo.set(i, Math.min(downOne, downTwo));

    return memo.get(i);
}

/**
 * DP - Bottom Up
 * Array - Tabulation
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/min-cost-climbing-stairs/
 * @param {number[]} cost
 * @return {number}
 */
 var minCostClimbingStairs = (cost) => {
    const tabu = new Array(cost.length + 1).fill(0);

    for (let i = 2; i < tabu.length; i++) {
        const [ prev, prevPrev ] = [ (i - 1), (i - 2) ];
        const downOne = tabu[prev] + cost[prev];
        const downTwo = tabu[prevPrev] + cost[prevPrev];

        tabu[i] = Math.min(downOne, downTwo);
    }

    return tabu[tabu.length - 1];
}

/**
 * DP - Bottom Up
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/min-cost-climbing-stairs/
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = (cost) => {
    let [ downOne, downTwo ] = [ 0, 0 ];

    for (let i = 2; i < cost.length + 1; i++) {/* Time O(N) */
        const temp = downOne;

        const [ _prev, _prevPrev ] = [ (i - 1), (i - 2) ];
        const prev = downOne + cost[_prev];
        const prevPrev = downTwo + cost[_prevPrev];

        downOne = Math.min(prev, prevPrev);
        downTwo = temp;
    }

    return downOne;
}