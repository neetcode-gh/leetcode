/**
 * 2348. Number of Zero-Filled Subarrays
 * -----------------------
 * link: https://leetcode.com/problems/number-of-zero-filled-subarrays/
 *
 * description:
 * length => no of sub arrays
 * '0' => 1
 * '00' => 3
 * '000' => 6
 * '0000' => 10
 * for each zero we found count++ and adding count to result
 * if the element not zero => count = 0
 *
 * time : O(n)
 * space : O(1)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */

let zeroFilledSubarray = function (nums) {
    let result = 0;
    let count = 0;

    for (const num of nums) {
        if (num === 0) count++;
        else count = 0;
        result += count;
    }

    return result;
};