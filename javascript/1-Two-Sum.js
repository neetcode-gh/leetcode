//////////////////////////////////////////////////////////////////////////////
// One-Pass Hash Table
// Time: O(n)
// Space: O(n)
// This solution only makes one pass over the `nums` array.
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = {};
    for (let i = 0; i < nums.length; i++) {
        if (target - nums[i] in map) {
            return [map[target-nums[i]], i];
        } else {
            map[nums[i]] = i;
        }
    }
};

//////////////////////////////////////////////////////////////////////////////
// Two-Pass Hash Table
// Time: O(n)
// Space: O(n)
// This solution makes two passes over the `nums` array, but might be more
// readable
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum2 = function(nums, target) {
    const map = {};
    for (let i = 0; i < nums.length; i++) {
        map[nums[i]] = i;
    }

    for (let i = 0; i < nums.length; i++) {
        const difference = target - nums[i];
        if (map.hasOwnProperty(difference) && map[difference] !== i) {
            return [i, map[difference]];
        }
    }
};

//////////////////////////////////////////////////////////////////////////////
// Brute Force
// Time: O(n^2)
// Space: O(1)
// This solution uses a nested loop to check all combination of elements in
// the `nums` array. It has the worst time, but the best space complexity.
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
};
