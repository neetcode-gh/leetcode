/**
 * Binary Search
 * https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
 * Time O(log(n)) | Space O(1)
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    
    const result = [];

    result.push(binarySearch(true));
    result.push(binarySearch(false));

    function binarySearch(leftBias) {
      let left = 0;
      let right = nums.length - 1;
      let index = -1;

      while(left <= right) {
        
        const mid = Math.floor((left+right)/2);

        if(target > nums[mid]) {
          left = mid+1;
        }
        if(target < nums[mid]) {
          right = mid-1;
        }
        // this is the meat of the code
        if(target === nums[mid]) {
          if(leftBias) {
            index = mid;
            right = mid - 1;
          } else {
            index = mid;
            left = mid + 1;
          }
        }
      }

      return index;
    }

    return result;
};
