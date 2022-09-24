/**
 * https://leetcode.com/problems/subsets-ii/
 * Time O(N * 2^N) | Space O(N)
 * @param {number[]} nums
 * @return {number[][]}
 */
 var subsetsWithDup = function(nums) {
    nums.sort((a, b) => a - b);

    return dfs(nums);
};

const dfs = (nums, index = 0, set = [], subset = []) => {
    subset.push(set.slice())

    for (let i = index; i < nums.length; i++) {
        const isDuplicate = (index < i) && (nums[i - 1] === nums[i])
        if (isDuplicate) continue;

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
 * https://leetcode.com/problems/subsets-ii/
 * Time O(N * 2^N) | Space O(N * 2^N)
 * @param {number[]} nums
 * @return {number[][]}
 */
 var subsetsWithDup = (nums) => {
    nums.sort((a, b) => a - b);

    return bfs(nums)
}

const bfs = (nums, subsets = [[]]) => {
    let levels = subsets.length - 1

    for (let i = 0; i < nums.length; i++) {
        const isPrevDuplicate = (0 < i) && (nums[i - 1] === nums[i])
        const start = isPrevDuplicate
            ? (levels + 1)
            : 0

        levels = subsets.length - 1

        for (let level = start; level < (levels + 1); level++) {
            const nextLevel = [ ...subsets[level], nums[i] ]

            subsets.push(nextLevel)
        }
    }

    return subsets
}