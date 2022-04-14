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
    int res;
    public int maxPathSum(TreeNode root) {
        res = Integer.MIN_VALUE;
        dfs(root);
        return res;
    }
    
    private int dfs(TreeNode root) {
        if (root == null) return 0;
        
        int maxLeft = Math.max(0, dfs(root.left));
        int maxRight = Math.max(0, dfs(root.right));
        res = Math.max(res, root.val + maxLeft + maxRight);
        
        return root.val + Math.max(maxLeft, maxRight);
    }
}
