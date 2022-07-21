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
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let diameter = 0;

  function dfs(root) {
    if (root == null) return -1;

    const left = dfs(root.left);
    const right = dfs(root.right);
    diameter = Math.max(diameter, 2 + left + right);

    return 1 + Math.max(left, right);
  }
  dfs(root);

  return diameter;
};
