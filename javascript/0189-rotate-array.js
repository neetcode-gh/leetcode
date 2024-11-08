/**
 * Two Pointers
 * https://leetcode.com/problems/rotate-array/
 * 
 * Time O(n) | Space O(1)
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var rotate = function(nums, k) {
    
    // if the k exceeds the length of nums.
    k = k % nums.length;

    nums.reverse();
    reversePortionOfArray(nums, 0, k - 1);
    reversePortionOfArray(nums,k, nums.length - 1);
};

var reversePortionOfArray = function(nums,start,end) {
    while(start < end) {
        [nums[start],nums[end]] = [nums[end],nums[start]];
        start++;
        end--;
    }    
}


/**
 * Two Pointers
 * https://leetcode.com/problems/rotate-array/
 * 
 * Time O(n) | Space O(1)
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  
  k = k % nums.length;
  
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]];
    l += 1;
    r -= 1;
  }
    l = 0, 
    r = k - 1;
  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]];
    l += 1;
    r -= 1;
  }
   l = k;
   r = nums.length - 1;
  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]];
    l += 1;
    r -= 1;
  }
};
