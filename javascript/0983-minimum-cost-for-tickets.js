/**
 * DP | Caching | Recursion
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/minimum-cost-for-tickets
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function(days, costs) {
    
    const lastDay = days[days.length - 1];
    const cache = new Map();

    costs[0] = [costs[0], 1];
    costs[1] = [costs[1], 7];
    costs[2] = [costs[2], 30];

    const dfs = (idx) => {
        if (idx === days.length) return 0;
        if (cache.has(idx)) return cache.get(idx);
        let min = Infinity;

        for (let i = 0; i < costs.length; i++) {
            let j = idx;
            const [cost, period] = costs[i];
            while (idx < days.length && days[j] < days[idx] + period) j++;

            min = Math.min(min, cost + dfs(j));
        }

        cache.set(idx, min);
        return min;
    }

    return dfs(0);
};
