/**
* https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/
* 
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
* Time O(n^2) | Space O(1)
* @param {number[]} nums
* @return {number}
*/
var removeDuplicates2 = function(nums) {
    const isEdgeCase = (nums.length < 2)
    if (isEdgeCase) return nums.length;

    let [ left, right ] = [ 2, 2 ];

    while (right < nums.length) {/* Time O(N) */
        const isEqual = (nums[(left - 2)] === nums[right]);
        if (!isEqual) {
            nums[left] = nums[right];
            left += 1;
        }

        right += 1;
    }
    return left;
};
