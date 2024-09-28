/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * Tree | pre-order-traversal
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/sum-root-to-leaf-numbers
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
    
  let total = 0;
  const dfs = (node, num) => {
      if(!node.left && !node.right) {
          num = num + node.val;
          total += +num;
          return;
      }

      node.left && dfs(node.left, num + node.val);
      node.right && dfs(node.right, num + node.val);
  }

  dfs(root, "");
  return total;
};
