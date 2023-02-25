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
    private List<int> _result = new();

    public IList<int> RightSideView(TreeNode root) {
        Dfs(root, 0);
        return _result;
    }

    private void Dfs(TreeNode root, int level) {
        if (root == null) return;
        if (level >= _result.Count) _result.Add(root.val);

        // At first visit right node
        Dfs(root.right, level + 1);
        Dfs(root.left, level + 1);
    }
}
