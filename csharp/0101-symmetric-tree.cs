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
    public bool IsSymmetric(TreeNode root)
    {
        return Dfs(root.left, root.right);
    }

    private bool Dfs(TreeNode leftNode, TreeNode rightNode)
    {
        if (leftNode is null || rightNode is null)
        {
            return leftNode == rightNode;
        }

        if (leftNode.val != rightNode.val)
        {
            return false;
        }

        return Dfs(leftNode.left, rightNode.right)
            && Dfs(leftNode.right, rightNode.left);
    }
}