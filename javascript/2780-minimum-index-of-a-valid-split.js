/**
 * Time O(n) | Space O(n)
 * HashSet | Math
 * https://leetcode.com/problems/minimum-index-of-a-valid-split
 * @param {number[]} nums
 * @return {number}
 */
var minimumIndex = function(nums) {

    const freq = {};

    for (let i = 0; i < nums.length; i++) {

        const num = nums[i];
        freq[num] = (freq[num] && freq[num] + 1) || 1;
    }

    let target = 0;
    let maxOccurance = 0;

    for (const key in freq) {

        if (freq[key] > maxOccurance) {
            maxOccurance = freq[key];
            target = +key;
        }
    }
    
    let leftSideOccurance = 0;
    let rightSideOccurance = maxOccurance;

    for (let i = 0; i < nums.length - 1; i++) {

        const num = nums[i];

        if (num === target) {

            leftSideOccurance += 1;
            rightSideOccurance -= 1;
            if (leftSideOccurance > (i+1)/2 && 
                rightSideOccurance > (nums.length - i - 1)/2
            ) return i;
        }
    }

    return -1;
};
