/**
 * Bit Manipulation | HashMap
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/bitwise-xor-of-all-pairings/
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var xorAllNums = function(nums1, nums2) {
    
    const intOccurance = {};

    for (let i = 0; i < nums1.length; i++) {

        const num1 = nums1[i];
        intOccurance[num1] = (intOccurance[num1] && intOccurance[num1] + nums2.length) || nums2.length;
    }

    for (let i = 0; i < nums2.length; i++) {

        const num2 = nums2[i];
        intOccurance[num2] = (intOccurance[num2] && intOccurance[num2] + nums1.length) || nums1.length;
    }

    const result = [];

    for (const key in intOccurance) {

        const numOccurance = intOccurance[key];

        if (numOccurance % 2 === 0) {
            result.push(0);
        } else {
            result.push(+key);
        }
    }

    return result.reduce((acc, num) => num^acc, 0);
};
