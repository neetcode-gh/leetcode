// Dynamic Programming, Time Complexity: O(n), Space Complexity: O(1)
function minCost(costs: number[][]): number {
    let dp: number[] = [0, 0, 0];
    for ( const cost of costs ) {
        let currMin0: number = cost[0] + Math.min(dp[1], dp[2]);
        let currMin1: number = cost[1] + Math.min(dp[0], dp[2]);
        let currMin2: number = cost[2] + Math.min(dp[0], dp[1]);
        dp = [currMin0, currMin1, currMin2];
    }
    return Math.min(...dp);
};
