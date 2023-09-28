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
    public TreeNode InsertIntoBST(TreeNode root, int val)
    {
        if (root is null) return new TreeNode(val);

        TreeNode cur = root;

        while (cur is not null)
        {
            if (cur.val < val)
            {
                if (cur.right is null)
                {
                    cur.right = new TreeNode(val);
                    break;
                }

                cur = cur.right;
                continue;
            }

            if (cur.val > val)
            {
                if (cur.left is null)
                {
                    cur.left = new TreeNode(val);
                    break;
                }

                cur = cur.left;
                continue;
            }
        }

        return root;
    }
}