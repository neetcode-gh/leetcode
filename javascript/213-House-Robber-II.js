/**
 * Greedy - Max
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/house-robber-ii/
 * @param {number[]} nums
 * @return {number}
 */
var rob = (nums) => {
    const isBaseCase1 = (nums.length === 0);
    if (isBaseCase1) return 0;

    const isBaseCase2 = (nums.length === 1);
    if (isBaseCase2) return nums[0]

    const left = search(nums, 0, (nums.length - 2)); /* Time O(N) */
    const right = search(nums, 1, (nums.length - 1));/* Time O(N) */

    return Math.max(left, right);
};

const search = (nums, start, end) => {
    let [ left, mid ] = [ 0, 0 ];

    for (let i = start; i <= end; i++) {/* Time O(N) */
        const temp = mid;
        const right = nums[i];
        const house = left + right;

        mid = Math.max(mid, house);
        left = temp;
    }

    return mid;
}


