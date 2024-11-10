/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * DFS | Recursion
 * Time O(n)  | Space O(n)
 * https://leetcode.com/problems/range-sum-of-bst
 * 
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function(root, low, high) {
    
    let total = 0;

    const dfs = (node) => {
        if (!node) return;
        if (node.val >= low && node.val <= high) total += node.val;
        dfs(node.left);
        dfs(node.right);
    }
    dfs(root);
    return total;
};
