/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * DFS - Preorder | Left as mid
 * Time O(N) | Space O(log(N))
 * https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = (nums, left = 0, right = (nums.length - 1)) => {
    const isBaseCase = (right < left);
    if (isBaseCase) return null;

    return dfs(nums, left, right);/* Time O(N) | Space O(log(N)) */
};

var dfs = (nums, left, right) => {
    const mid = (left + right) >> 1;

    const root = new TreeNode(nums[mid]);                 /*           | Ignore Auxillary Space O(N) */
    
    root.left = sortedArrayToBST(nums, left, (mid - 1));  /* Time O(N) | Space O(log(N)) */
    root.right = sortedArrayToBST(nums, (mid + 1), right);/* Time O(N) | Space O(log(N)) */
    
    return root;
}

/**
 * DFS - Preorder | Right as mid
 * Time O(N) | Space O(log(N))
 * https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = (nums, left = 0, right = (nums.length - 1)) => {
    const isBaseCase = (right < left);
    if (isBaseCase) return null;

    return dfs(nums, left, right);/* Time O(N) | Space O(log(N)) */
};

var dfs = (nums, left, right) => {
    let mid = (left + right) >> 1;
    
    const isOdd = (((left + right) % 2) === 1);
    if (isOdd) mid += 1;

    const root = new TreeNode(nums[mid]);                 /*           | Ignore Auxillary Space O(N) */
    
    root.left = sortedArrayToBST(nums, left, (mid - 1));  /* Time O(N) | Space O(log(N)) */
    root.right = sortedArrayToBST(nums, (mid + 1), right);/* Time O(N) | Space O(log(N)) */
    
    return root;
}

/**
 * DFS - Preorder | Random as mid
 * Time O(N) | Space O(log(N))
 * https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = (nums, left = 0, right = (nums.length - 1)) => {
    const isBaseCase = (right < left);
    if (isBaseCase) return null;

    return dfs(nums, left, right);/* Time O(N) | Space O(log(N)) */
};

var dfs = (nums, left, right) => {
    let mid = (left + right) >> 1;
    
    const isOdd = (((left + right) % 2) === 1);
    if (isOdd) mid += Math.floor(Math.random() * 2);

    const root = new TreeNode(nums[mid]);                 /*           | Ignore Auxillary Space O(N) */
    
    root.left = sortedArrayToBST(nums, left, (mid - 1));  /* Time O(N) | Space O(log(N)) */
    root.right = sortedArrayToBST(nums, (mid + 1), right);/* Time O(N) | Space O(log(N)) */
    
    return root;
}
