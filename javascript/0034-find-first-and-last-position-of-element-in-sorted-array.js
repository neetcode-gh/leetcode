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

    result.push(binarySearch(true, nums, target));
    result.push(binarySearch(false, nums, target));

    return result;
};

var binarySearch = (isLeftBias, nums, target) => {
      let left = 0;
      let right = nums.length - 1;
      let index = -1;

      while(left <= right) {
        
        const mid = (left + right) >> 1;

        if(target > nums[mid]) {
          left = mid+1;
        }
        if(target < nums[mid]) {
          right = mid-1;
        }
        
        const isTarget = target === nums[mid];
        if(isTarget) {
          if(isLeftBias) {
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
