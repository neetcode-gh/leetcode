/*
 * Using Quick Select Algorithm
 * https://www.youtube.com/watch?v=XEmy13g1Qxc
 * https://leetcode.com/problems/kth-largest-element-in-an-array/
 */
const findKthLargest = (nums, k) => {
  // find k distance from 0 index
  k = nums.length - k;
  // similar to quick sort	
  return quickSelect(nums, 0, nums.length - 1, k);
};


// recursive function
function quickSelect (nums, left, right, k) {
  let pivot = nums[right];
  let p = left;
  for (let i = left; i < right; i += 1) {
    if (nums[i] <= pivot) {
      // swap  
      [nums[p], nums[i]] = [nums[i], nums[p]];
      p += 1;
    }
  }
  // swap
  [nums[p], nums[right]] = [nums[right], nums[p]];
  if (p > k) {
    return quickSelect(nums, left, p - 1, k);
  } else {
    if (p < k) {
      return quickSelect(nums, p + 1, right, k);
    } else {
      return nums[p];
    }
  }
}

// TESTING
console.log('Kth Largest element is:', findKthLargest([3,2,1,5,6,4], 2)); // 5
console.log('Kth Largest element is:', findKthLargest([3,2,3,1,2,4,5,5,6], 4)); // 4

/**
 * NOTES
 * Three approaches
 * Approach #1 - Sort the array get the kth largest from behind, O(nlogn)
 * Approach #2 - Using MaxHeap - O(n) + O(klogn)
 * Approach #3 - Using Quick Select Algorithm
 * - Has an average Time complexity: O(n)
 * - Has a worst time complexity: O(n^2)
 * - For explanation, watch the video
 */
