function minCostII(costs: number[][]): number {
    let dp: number[] = new Array(costs[0].length).fill(0);
    let dpPrev = [...dp];
    for ( const cost of costs ) {
        for ( let i = 0; i < cost.length; i++ ) {
            dp[i] = cost[i] + Math.min(...dpPrev.slice(0, i), ...dpPrev.slice(i + 1));
        }
        dpPrev = [...dp];
    }
    return Math.min(...dp);
};