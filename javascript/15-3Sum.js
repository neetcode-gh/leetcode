/**
 * https://leetcode.com/problems/3sum/
 * Time O(N ^ 2) | Space O(N)
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums.sort((a, b) => a - b );
    let outputArr = [];
    let numOne, numTwo, numThree;
    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        numOne = nums[i];
        // do twoSum
        let [left, right] = [i+1, nums.length - 1];
        while (left < right) {
            // find two sums that equal 0 when added to first number
            [numTwo, numThree] = [nums[left], nums[right]];
            // continue if duplicate
            if (left > i+1 && numTwo == nums[left - 1]) {
                left++;
            } else if ((numOne + numTwo + numThree) > 0) {
                right--;
            } else if ((numOne + numTwo + numThree) < 0) {
                left++;
            } else {
                outputArr.push([numOne, numTwo, numThree]);
                left++; right--;
            }
        }
    }
    return outputArr;
};

/**
 * https://leetcode.com/problems/3sum/
 * Time O(N ^ 2) | Space O(N)
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums, sums = []) {
    nums.sort((a, b) => a - b);

    for (let first = 0; first < nums.length - 2; first++) {
        if (isPrevDuplicate(nums, first)) continue;

        const [target, left, right] = [
            -nums[first],
            first + 1,
            nums.length - 1,
        ];

        search(nums, target, left, right, sums);
    }

    return sums;
};

const isPrevDuplicate = (nums, index) => nums[index - 1] === nums[index];

const isNextDuplicate = (nums, index) => nums[index] === nums[index + 1];

const search = (nums, target, left, right, sums) => {
    while (left < right) {
        const [leftVal, rightVal] = [nums[left], nums[right]];
        const sum = leftVal + rightVal;

        const isTarget = sum === target;
        if (isTarget) {
            sums.push([-target, leftVal, rightVal]);
            left++;
            right--;

            while (left < right && isPrevDuplicate(nums, left)) left++;
            while (left < right && isNextDuplicate(nums, right)) right--;

            continue;
        }

        const isTargetGreater = sum < target;
        if (isTargetGreater) left++;

        const isTargetLess = target < sum;
        if (isTargetLess) right--;
    }
};
