//////////////////////////////////////////////////////////////////////////////
// Linear Search With A Hash Set
// Time: O(n)
// Space: O(n)
// This solution does three passes over the `nums` array. A first pass to
// setup the hash set. A second pass to find the numbers that mark the
// beginning of a sequence. A third pass to calculate the length of each
// sequence. The nested `while` loop does not cause quadratic calculations as
// it is only initiated on the first number of each sequence.
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {number[]} nums
 * @return {number}
 */
function longestConsecutive(nums) {

    const set = new Set(nums);
    let max = 0;

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];

        if (set.has(num - 1)) {
            continue;
        }

        let currentMax = 1;
        while (set.has(num + currentMax)) {
            currentMax++;
        }

        if (currentMax > max) {
            max = currentMax;
        }
    }

    return max;
}
