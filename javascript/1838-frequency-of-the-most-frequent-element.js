/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxFrequency = function (nums, k) {
    const sortedNums = nums.sort((a, b) => a - b);

    let maxLength = 0;

    let currentSum = 0;
    let leftWindow = 0;
    for (let rightWindow = 0; rightWindow < sortedNums.length; rightWindow++) {
        const currentLength = rightWindow - leftWindow + 1;
        const rightNum = sortedNums[rightWindow];
        currentSum += rightNum;

        if (currentSum + k >= rightNum * currentLength) {
            maxLength = currentLength;
        } else {
            const leftNum = sortedNums[leftWindow];
            currentSum -= leftNum;
            leftWindow++;
        }
    }
    return maxLength;
};
