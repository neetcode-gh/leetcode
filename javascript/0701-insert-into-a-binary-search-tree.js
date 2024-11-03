/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * h = height of the tree, could be n.
 * Time O(h) | Space O(h)
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function(root, val) {
    return dfs(root, val);
};

const dfs = (root, val) => {
    if (!root) {
        return new TreeNode(val);
    }
    if (val > root.val) {
        root.right = dfs(root.right, val);
        return root;
    }
    root.left = dfs(root.left, val);
    return root;
}
