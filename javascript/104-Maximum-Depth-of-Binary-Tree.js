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
var maxDepth = (root) => {
  let maxDepth = 0;
  let DFS = (node, depth) => {
    if (!node) return maxDepth;
    if (depth > maxDepth) maxDepth = depth;
    DFS(node.right, depth + 1);
    DFS(node.left, depth + 1);
  };
  DFS(root, 1);
  return maxDepth;
};
