/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarraySumCircular = function (nums) {
    let [globalMax, globalMin] = [nums[0], nums[0]];
    let [currentMax, currentMin] = [0, 0];
    let total = 0;

    for (num of nums) {
        currentMax = Math.max(num, currentMax + num);
        currentMin = Math.min(num, currentMin + num);
        total += num;
        globalMax = Math.max(globalMax, currentMax);
        globalMin = Math.min(globalMin, currentMin);
    }

    return globalMax > 0 ? Math.max(globalMax, total - globalMin) : globalMax;
};
