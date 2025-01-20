/**
 * https://leetcode.com/problems/subsets/
 * Time O(N * 2^N) | Space(N)
 * @param {number[]} nums
 * @return {number[][]}
 */
 var subsets = (nums) => {
    nums.sort((a, b) => a -b);

    return dfs(nums)
}

var dfs = (nums, level = 0, set = [], subset = []) => {
    subset.push(set.slice());

    for (let i = level; i < nums.length; i++){
        backTrack(nums, i, set, subset);
    }

    return subset
}

const backTrack = (nums, i, set, subset) => {
    set.push(nums[i]);
        dfs(nums, (i + 1), set, subset);
    set.pop();
}

/**
 * https://leetcode.com/problems/subsets/
 * Time O(N * 2^N) | Space(N * 2^N)
 * @param {number[]} nums
 * @return {number[][]}
 */
 var subsets = (nums) => {
    nums.sort((a, b) => a -b);

    return bfs(nums)
}

const bfs = (nums, subsets = [[]]) => {
    for (const num of nums) {
        const levels = subsets.length

        for (let level = 0; level < levels; level++) {
            const nextLevel = [ ...subsets[level], num ]

            subsets.push(nextLevel)
        }
    }

    return subsets
}

/**
 * BruteForce | Backtracking | Recursion
 * Time O(2^n) | Space O(2^n) 
 * https://leetcode.com/problems/subsets/
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    
    const dfs = (idx, currSubSet, subsets) => {

        if (idx === nums.length) return subsets;
        
        currSubSet.push(nums[idx]);
        subsets.push([...currSubSet]);
        dfs(idx+1, currSubSet, subsets);
        currSubSet.pop();
        dfs(idx+1, currSubSet, subsets);
        return subsets;
    }

    return dfs(0, [], [[]]); // you  can have an empty set as valid set that is why we're adding an empty array into subsets.
};
