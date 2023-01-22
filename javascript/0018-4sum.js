/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    const sortedNums = nums.sort((a, b) => a - b);
    const res = [];
    const quad = [];

    const kSum = (k, start, target) => {
        if (k > 2) {
            for (let i = start; i < sortedNums.length; i++) {
                if (i !== start && sortedNums[i] === sortedNums[i - 1]) {
                    continue;
                }
                quad.push(sortedNums[i]);
                kSum(k - 1, i + 1, target - sortedNums[i]);
                quad.pop();
            }
        } else {
            let left = start;
            let right = sortedNums.length - 1;

            while (left < right) {
                const sum = sortedNums[left] + sortedNums[right];
                if (sum < target) {
                    left++;
                } else if (sum > target) {
                    right--;
                } else {
                    res.push(
                        quad.concat([sortedNums[left], sortedNums[right]])
                    );
                    left++;
                    while (
                        left < right &&
                        sortedNums[left] === sortedNums[left - 1]
                    ) {
                        left++;
                    }
                }
            }
        }
    };
    kSum(4, 0, target);
    return res;
};
