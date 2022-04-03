/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;
    
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) {
      return mid;
    }
    
    // Checking if the left side is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target <= nums[mid]) {
        // thus target is in the left
        right = mid - 1;
        
      } else {
        // thus target is in the right
        left = mid + 1;
      }
    } 
    
    // Otherwise, the right side is sorted
    else {
      if (nums[mid] <= target && target <= nums[right]) {
        // thus target is in the right
        left = mid + 1;

      } else {
        // thus target is in the left
        right = mid - 1;
      }
    }
    
  }
    
  return -1;
};
