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
    public bool IsCompleteTree(TreeNode root)
    {
        Queue<TreeNode> queue = new Queue<TreeNode>();
        queue.Enqueue(root);

        bool nullFound = false;

        while (queue.Any())
        {
            TreeNode node = queue.Dequeue();

            if (node is null)
            {
                nullFound = true;
                continue;
            }

            if (nullFound)
            {
                return false;
            }

            queue.Enqueue(node.left);
            queue.Enqueue(node.right);
        }

        return true;
    }
}