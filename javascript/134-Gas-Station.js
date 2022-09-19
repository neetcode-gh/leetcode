/**
 * https://leetcode.com/problems/gas-station/
 * Time: O(n)
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
    let netDistance = 0;
    let res = 0;

    //Checks if theres enough gas to complete a cycle
    if (gas.reduce((a, b) => a + b) - cost.reduce((a, b) => a + b) < 0) {
        return -1;
    }

    // Finds the first appearence of a positive netDistance, if the cycle can't
    // be completed (netDistance < 0), starts cycle again @ the next positive netDistance value.
    for (let i = 0; i < gas.length; i++) {
        netDistance += gas[i] - cost[i];

        if (netDistance < 0) {
            netDistance = 0;
            res = i + 1;
        }
    }
    return res;
};
