/**
 * @param {number[][]} costs
 * @return {number}
 */
const twoCitySchedCost = (costs) => {
    costs.sort((a, b) => a[1] - a[0] - (b[1] - b[0]));

    let totalCost = 0;
    let n = costs.length / 2;
    for (let i = 0; i < n; i++) {
        totalCost += costs[i][1] + costs[i + n][0];
    }
    return totalCost;
};
