//////////////////////////////////////////////////////////////////////////////
// Backtracking
// Time: O(n*2^n)
// Space: O(2^n)
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsetsWithDup(nums) {
    nums.sort((a, b) => a - b);
    const results = [];
    const result = [];
    getSubsets();
    return results;

    /**
     * @param {number} start = `0`
     * @return {void}
     */
    function getSubsets(start = 0) {
        results.push(result.slice());

        for (let i = start; i < nums.length; ++i) {
            if (i !== start && nums[i] === nums[i - 1]) {
                continue;
            }
            result.push(nums[i]);
            getSubsets(i + 1);
            result.pop();
        }
    }
}
