class Solution {

    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (root == null && subRoot == null) return true;
        if (root == null || subRoot == null) return false;
        if (root.val == subRoot.val) {
            return (
                isSubtree(root.left, subRoot.left) &&
                isSubtree(root.right, subRoot.right)
            );
        } else {
            return (
                isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
            );
        }
    }
}
