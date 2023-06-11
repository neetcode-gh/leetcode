/**
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let l=0, r=0;

    while( r < nums.length){
        let count = 1;
        while(nums[r] === nums[r+1]){
            r++;
            count++;
        }
        const c = Math.min(2, count);
        for(let i=0; i < c ; i++){
            nums[l++] = nums[r]
        }
        r++;
    }
    return l;
};