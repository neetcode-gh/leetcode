/**
 * Definition for a binary tree node.
 * public class TreeNode 
 * {
 *     public int val;
 *     public TreeNode left;
 *     public TreeNode right;
 *     public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) 
 *     {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class Solution
{
    public bool IsSameTree(TreeNode one, TreeNode another)
    {
        if (one == null || another == null)
        {
            return one == another;
        }
        return
            one.val == another.val &&
            IsSameTree(one.left, another.left) &&
            IsSameTree(one.right, another.right);
    }
    public bool IsSubtree(TreeNode root, TreeNode subRoot)
    {
        if (subRoot == null) return true;
        if (root == null) return false;

        var nodeToVisit = new Queue<TreeNode>();

        nodeToVisit.Enqueue(root);

        while (nodeToVisit.Count > 0)
        {
            var cur = nodeToVisit.Dequeue();
            var isSame = IsSameTree(cur, subRoot);
            if (isSame) return true;

            if (cur.left != null)
                nodeToVisit.Enqueue(cur.left);
            if (cur.right != null)
                nodeToVisit.Enqueue(cur.right);
        }

        return false;
    }
}