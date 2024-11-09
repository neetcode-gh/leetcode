/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * Post-order-traversal
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/binary-tree-postorder-traversal/
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
    
    const dfs = (node, pot) => {
        if (!node) return pot;
        dfs(node.left, pot);
        dfs(node.right, pot);
        pot.push(node.val);
        return pot;
    }
    return dfs(root, []);
};
