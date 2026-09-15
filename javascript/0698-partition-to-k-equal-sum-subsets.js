/**
 * Backtracking.
 * Time O(n^n) | Space O(n) 
 * https://leetcode.com/problems/partition-to-k-equal-sum-subsets/
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function(nums, k) {

    const target = nums.reduce((acc, num) => acc+num, 0)/k;
    nums.sort((a,b)=> b-a); 
    const taken = new Set();

    const dfs = (index,  k, currSum) => {
        if (k === 0) return true;
        if (currSum === target) return dfs(0, k-1, 0);

        for (let i = index; i < nums.length; i++) {
            if (currSum+nums[i] > target) continue;
            if (taken.has(i)) continue;
            if (i > 0 && !taken.has(i-1) && nums[i] === nums[i-1]) continue;

            taken.add(i);
            if (dfs(i+1, k, currSum+nums[i])) return true;
            taken.delete(i);
        }
        return false;
    }  

    return dfs(0,k,0);
};
