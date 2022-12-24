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
public class Solution
{

    //T: O(N) and S: O(H)
    public bool IsBalanced(TreeNode root)
    {
        return checkHeight(root) != int.MinValue;
    }

    private int checkHeight(TreeNode root)
    {
        if (root == null)
            return -1;
        var leftHeight = checkHeight(root.left);
        if (leftHeight == int.MinValue) return leftHeight;

        var rightHeight = checkHeight(root.right);
        if (rightHeight == int.MinValue) return rightHeight;

        var heightDiff = leftHeight - rightHeight;
        if (Math.Abs(heightDiff) > 1)
            return int.MinValue;
        else
            return Math.Max(leftHeight, rightHeight) + 1;

    }
}