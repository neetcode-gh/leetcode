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
    
    const dfs = (node) => {
        if(!node.left && !node.right) return node.val;

        if(node.val === 2) {
            return dfs(node.left) || dfs(node.right);
        }
        if(node.val === 3) {
            return dfs(node.left) && dfs(node.right);
        }
    }

    return (dfs(root) && true) || false; 
};
