/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * DFS | Tree-trevarsal
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/symmetric-tree/
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    return dfs(root.left, root.right);
};
    
const dfs = (node1, node2) => {

    if (!node1 && !node2) return true;

    if (node1 && !node2) return false;
    if (!node1 && node2) return false;
    if (node1.val !== node2.val) return false;

    return dfs(node1.right, node2.left) && dfs(node1.left, node2.right);
}
