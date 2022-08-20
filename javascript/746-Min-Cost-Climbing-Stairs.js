/**
 * @param {number[]} cost
 * @return {number}
 */

let minCostClimbingStairs = (cost) => {    
    for (let i = 2; i < cost.length; i++){
        cost[i] = Math.min(cost[i-1] + cost[i], cost[i-2] + cost[i])
    }
    return(Math.min(cost[cost.length-1], cost[cost.length-2]))
}
