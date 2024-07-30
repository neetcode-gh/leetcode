/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * Tree | reverse pre-order-traversal 
 * Time O(n) | Space O(n)
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function(root) {

    const dfs = (node, max) =>  {
        if(!node) return max;

        const result = dfs(node.right, max);
        node.val = result + node.val;
        const result1 = dfs(node.left, node.val);
        return result1;
    }

    dfs(root, 0);
    return root;
};
