/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
 var isBalanced = function (root) {
    if (!root) return true
    const left = findHeight(root.left)
    const right = findHeight(root.right)
    return Math.abs(left - right) <= 1 && isBalanced(root.left) && isBalanced(root.right)
};

function findHeight(node) {
    if (node == null) return 0;
    return 1 + Math.max(this.findHeight(node.left), this.findHeight(node.right));
}

// Runtime: 78 ms, faster than 90.43% of JavaScript online submissions for Balanced Binary Tree.
// Memory Usage: 47.1 MB, less than 32.41% of JavaScript online submissions for Balanced Binary Tree.