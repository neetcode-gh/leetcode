/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    let left = 0;
    let right = nums.length - 1;

    const answer = [];

    while (left <= right) {
        const leftSqr = Math.pow(nums[left], 2);
        const rightSqr = Math.pow(nums[right], 2);

        if (leftSqr > rightSqr) {
            answer.push(leftSqr);
            left++;
        } else {
            answer.push(rightSqr);
            right--;
        }
    }
    return answer.reverse();
};
