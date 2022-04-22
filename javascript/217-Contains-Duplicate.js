/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var containsDuplicate = function(nums) {
    let set = new Set();
    return nums.some(num => {
        if(set.has(num))
            return true;
        set.add(num);
    });
    
};