/**
 * https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
 * Time O(N) | Space O(1)
 * @param {number[]} nums
 * @return {TreeNode}
 */

var sortedArrayToBST = function(nums) {
    return helper(nums, 0, nums.length - 1)
};

function helper(nums, start, end) {
    if(start > end) {
        return null
    }
    let mid  = ~~((start + end)/2)
    let root = new TreeNode(nums[mid])
    root.left = helper(nums, start, mid-1)
    root.right = helper(nums, mid+1, end)
    return root

}
