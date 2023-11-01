/*
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/number-of-zero-filled-subarrays
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var zeroFilledSubarray = function(nums) {
    let total, count;
    total = count = 0;
    for(let element of nums){
        if(element == 0){
            count ++;
            total += count;
        }else{
            count = 0;
        }
    };
    return total;
};