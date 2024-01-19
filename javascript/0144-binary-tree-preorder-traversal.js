/**
 * 
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/binary-tree-preorder-traversal/
 * Time O(N) | Space O(H)
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    const result = [];

   function traverse(node) {
       if (node) {
           result.push(node.val);
           traverse(node.left);
           traverse(node.right);
       }
   }

   traverse(root);
   return result;
};