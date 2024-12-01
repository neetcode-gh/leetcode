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
    private bool _result = true;

    public bool IsBalanced(TreeNode root) {
        Dfs(root);
        return _result;
    }

    private int Dfs(TreeNode root) {
        if(root == null) {
            return -1;
        }

        var leftDepth = Dfs(root.left);
        var rightDepth = Dfs(root.right);

        _result = _result && (Math.Abs(rightDepth - leftDepth) <= 1);

        return Math.Max(leftDepth, rightDepth) + 1;
    }
}
