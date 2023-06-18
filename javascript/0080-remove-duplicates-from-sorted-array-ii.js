/**
 * Linear
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/
 * Time O(n) | Space O(1)
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let current = nums[0];
    let sameElCount = 0;

    for(let i = 0; i < nums.length; i++) {
      if(current === nums[i]) {
          sameElCount++;
      } 
      if(current !== nums[i]) {
          current = nums[i];
          sameElCount = 1;
      }
     if(sameElCount > 2) {
         nums.splice(i,1);
         i--;
      }
    }
};

/**
 * Two pointer
 * Time O(n) | Space O(1)
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates2 = function(nums) {

    let current = nums[0];
    let sameElCount = 0;


    for(let i = 0; i < nums.length; i++) {
      if(current === nums[i]) {
          sameElCount++;
      } 
      if(current !== nums[i]) {
          current = nums[i];
          sameElCount = 1;
      }
      if(sameElCount > 2) {
          let left = i;
          let right = i+1;
          let count = 1;
          while(nums[left] === nums[right]) {
              count++;
              right++;
          }
          nums.splice(left, count);
          i--;
      }
    }
    return nums.length;
};
