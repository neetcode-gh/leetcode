/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    let minLength = Infinity;
    let leftWindow = 0;
    let currentSum = 0;

    for (let rightWindow = 0; rightWindow < nums.length; rightWindow++) {
        currentSum += nums[rightWindow];
        while (currentSum >= target) {
            minLength = Math.min(minLength, rightWindow - leftWindow + 1);
            currentSum -= nums[leftWindow];
            leftWindow++;
        }
    }
    return minLength === Infinity ? 0 : minLength;
};
