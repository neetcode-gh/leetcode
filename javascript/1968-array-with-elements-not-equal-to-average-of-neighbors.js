/**
 * Two Pointers
 * https://leetcode.com/problems/array-with-elements-not-equal-to-average-of-neighbors/
 * 
 * Time O(n*log(n)) | Space O(n)
 * @param {number[]} nums
 * @return {number[]}
 */
 var rearrangeArray = function(nums) {
    nums.sort((a,b) => a-b);
    
    let midPointer = Math.ceil(nums.length / 2);
    let beginingPointer = 1;
  
    while(midPointer < nums.length) {
        swap(midPointer, beginingPointer, nums);
        midPointer++;
        beginingPointer += 2
    }
    return nums;
  };
  
var swap = function(i,j,nums) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
}
