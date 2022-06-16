/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let map = {};
    for (let i = 0; i < nums.length; i++) {
        if (target - nums[i] in map) {
            return [map[target-nums[i]], i];
        } else {
            map[nums[i]] = i;
        }
    }
};

//Brute force, straight forward nested for loops
var twoSum = function(nums, target) {
    for (let i=0; i<nums.length; i++) {
        for (let j=nums.length-1; j>i; j--) {
            if(target === nums[i] + nums[j]) return [i, j];
        }
    }
};
