/**
 * BackTracking | Hashing | Recursion
 * Time O(2^n * n) | Space O(n)
 * https://leetcode.com/problems/the-number-of-beautiful-subsets
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var beautifulSubsets = function(nums, k) {
    
    const numSet = {};

    const checkIfValid = (arr) => {
        if (!arr.length) return false;
        for( let i = 0; i < arr.length; i++) {
            const key0 = arr[i] - k;
            const key1 = arr[i] + k;

            if (numSet[key0]) return false;
            if (numSet[key1]) return false;
        }
        return true;
    }

    const addToNumSet = (key) => {
        numSet[key] = (numSet[key] && numSet[key] + 1) || 1;
    }

    const removeFromNumSet = (key) => {
        numSet[key] -= 1;
    }

    let result = 0;
    const dfs = (arr, i) => {
        if (i === nums.length) {
            if (checkIfValid(arr)) result++;
            return;
        }

        // we have 2 choices.
        arr.push(nums[i]);
        addToNumSet(nums[i]);
        dfs(arr, i+1);
        arr.pop(nums[i]);
        removeFromNumSet(nums[i]);
        dfs(arr, i+1);
    }

    dfs([],0);
    return result;
};
