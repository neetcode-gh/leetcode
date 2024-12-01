/**
 * Post Order Traversal
 * Time O(n) | Space (n)
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function(root) {
    
    function dfs(root) {
        if(!root) return [0, 0];

        const leftSubTree = dfs(root.left);
        const rightSubTree = dfs(root.right);

        const withoutRoot = Math.max(...leftSubTree) + Math.max(...rightSubTree);
        const withRoot = root.val + leftSubTree[0] + rightSubTree[0];

        return [withoutRoot,  withRoot];
    }

   return Math.max(...dfs(root));
};
