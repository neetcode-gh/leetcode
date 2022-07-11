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
 * @return {number[]}
 */
var rightSideView = function (root) {
  let result = [];
  let queue = [];

  if (root === null) {
    return [];
  }

  queue.push(root);

  while (queue.length > 0) {
    let length = queue.length;
    for (let i = 0; i < length; i++) {
      let node = queue.shift();
      if (i === length - 1) {
        result.push(node.val);
      }
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }
  return result;
};
