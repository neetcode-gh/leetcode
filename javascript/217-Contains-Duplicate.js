/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    let map = new Set();
    for (let idx=0;idx<nums.length;idx++){
        if (map.has(nums[idx])) return true;
            
        map.add(nums[idx]);
    }
     return false;
};
