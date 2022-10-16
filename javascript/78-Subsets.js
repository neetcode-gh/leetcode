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
