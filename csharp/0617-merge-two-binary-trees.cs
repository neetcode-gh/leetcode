public class Solution {
    public TreeNode MergeTrees(TreeNode root1, TreeNode root2) {
        if (root1 == null) return root2;

        if (root2 == null) return root1;

        return new TreeNode(root1.val + root2.val,
            MergeTrees(root1.left, root2.left),
            MergeTrees(root1.right, root2.right)
        );
    }
}