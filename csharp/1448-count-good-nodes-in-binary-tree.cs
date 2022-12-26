/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left;
 *     public TreeNode right;
 *     public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class Solution {
    private int goodNodeCount = 0;
    public void dfs(TreeNode cur, int pathMax) {
        if(cur == null) return;
        if(cur.val >= pathMax) {
            pathMax = cur.val;
            goodNodeCount++;
        }
        dfs(cur.left, pathMax);
        dfs(cur.right, pathMax);
        
    }
    public int GoodNodes(TreeNode root) {
        dfs(root, int.MinValue);
        return goodNodeCount;
    }
}