package java;

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {

  int[] res = new int[1];

  public int maxPathSum(TreeNode root) {
    res[0] = root.val;
    dfs(root);
    return res[0];
  }

  private int dfs(TreeNode node) {
    if (node == null) return 0;

    int leftMax = dfs(node.left);
    int rightMax = dfs(node.right);

    leftMax = Math.max(leftMax, 0);
    rightMax = Math.max(rightMax, 0);

    int allMax = leftMax + rightMax + node.val;
    res[0] = Math.max(res[0], allMax);

    return node.val + Math.max(leftMax, rightMax);
  }
}
