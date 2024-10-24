/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * DFS | Tree-traversal
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/evaluate-boolean-binary-tree
 * @param {TreeNode} root
 * @return {boolean}
 */
var evaluateTree = function(root) {
    return dfs(root);
};

const dfs = (node) => {
    
    if (!node.left && !node.right && node.val) return true;
    if (!node.left && !node.right && !node.val) return false;
    
    const is2 = (node.val === 2);
    if (is2) return dfs(node.left) || dfs(node.right);
    
    const is3 = (node.val === 3);
    if (is3) return dfs(node.left) && dfs(node.right);

}
