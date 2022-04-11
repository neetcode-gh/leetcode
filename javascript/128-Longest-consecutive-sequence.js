/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {

    const set = new Set(nums);
    let max = 0;

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (set.has(num - 1)) continue;

        let currentMax = 1;
        while (set.has(num + currentMax)) {
            currentMax++;
        }

        if (currentMax > max) max = currentMax;
    }

    return max;

};