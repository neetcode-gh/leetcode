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
    public TreeNode BuildTree(int[] preorder, int[] inorder)
    {
        return BuildTreeHelper(0, 0, inorder.Length - 1, preorder, inorder);
    }

    private TreeNode BuildTreeHelper(int preStart, int inStart, int inEnd, int[] preorder, int[] inorder)
    {
        if (preorder.Length == 0 && inorder.Length == 0)
            return null;

        if (preStart > preorder.Length - 1 || inStart > inEnd)
            return null;

        var rootNode = new TreeNode(preorder[preStart]);
        var mid = Array.IndexOf(inorder, preorder[preStart]);

        rootNode.left = BuildTreeHelper(preStart + 1, inStart, mid - 1, preorder, inorder);
        rootNode.right = BuildTreeHelper(preStart + mid - inStart + 1, mid + 1, inEnd, preorder, inorder);

        return rootNode;
    }
}