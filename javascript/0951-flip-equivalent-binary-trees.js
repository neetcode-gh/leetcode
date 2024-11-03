/**
 * Tree | pre-order-traversal
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/flip-equivalent-binary-trees/
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var flipEquiv = function(root1, root2) {
    
    const dfs = (node1, node2) => {
        if (!node1 && !node2) return true;
        if (!node1) return false;
        if (!node2) return false;
        
        if (node1.val !== node2.val) return false;

        if ((node1.left && node1.left.val) !== (node2.left && node2.left.val)) {
            return dfs(node1.right, node2.left) && dfs(node1.left, node2.right);
        }

        return dfs(node1.left, node2.left) && dfs(node1.right, node2.right);
    }

    return dfs(root1, root2);
};
