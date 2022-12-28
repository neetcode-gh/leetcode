// Solution: Recursive Approach

// Time Complexity: O(n)
// Extra Space Complexity: O(n)
class Solution1 {

    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (root == null && subRoot == null) {
            return true;
        }
        if (root == null || subRoot == null) {
            return false;
        }
        if (isSameTree(root, subRoot)) {
            return true;
        }

        return (
            isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
        );
    }

    private boolean isSameTree(TreeNode root, TreeNode subRoot) {
        if (root == null && subRoot == null) {
            return true;
        }
        if (root == null || subRoot == null) {
            return false;
        }
        if (root.val == subRoot.val) {
            return (
                isSameTree(root.left, subRoot.left) &&
                isSameTree(root.right, subRoot.right)
            );
        }

        return false;
    }
}
