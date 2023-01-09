/**
 * Definition for a binary tree node.
 * class TreeNode {
 *   int val;
 *   TreeNode? left;
 *   TreeNode? right;
 *   TreeNode([this.val = 0, this.left, this.right]);
 * }
 */
class Solution {
  TreeNode? mergeTrees(TreeNode? root1, TreeNode? root2) {
      if (root1 == null && root2 == null) {
          return null;
      }

      int val1 = (root1 == null) ? 0 : root1.val;
      int val2 = (root2 == null) ? 0 : root2.val;
      TreeNode res = TreeNode();
      res.val = val1 + val2;
      res.left = mergeTrees((root1 == null) ? null : root1.left, (root2 == null) ? null : root2.left);
      res.right = mergeTrees((root1 == null) ? null : root1.right, (root2 == null) ? null : root2.right);
      return res;
  }
}