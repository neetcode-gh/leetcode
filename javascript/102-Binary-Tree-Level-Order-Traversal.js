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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length) {
    const numNodes = queue.length;
    const temp = [];
    for (let i = 0; i < numNodes; i++) {
      const subtree = queue.shift();
      temp.push(subtree.val);
      if (subtree.left !== null) queue.push(subtree.left);
      if (subtree.right !== null) queue.push(subtree.right);
    }
    result.push(temp);
  }

  return result;
};
