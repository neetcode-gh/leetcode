/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * Pre-order-traversal
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/binary-tree-preorder-traversal/
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    
    const dfs = (node, pre) => {
        if (!node) return pre;
        pre.push(node.val);
        dfs(node.left, pre);
        dfs(node.right, pre);
        return pre;
    }

    return dfs(root, []);
};
