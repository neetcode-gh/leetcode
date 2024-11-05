class Solution {
    TreeNode prev = null;
    int res = Integer.MAX_VALUE;

    public int minDiffInBST(TreeNode root) {
        dfs(root);
        return res;
    }

    private void dfs(TreeNode node) {
        if (node == null) {
            return;
        }
        dfs(node.left);
        if (prev != null) {
            res = Math.min(res, node.val - prev.val);
        }
        prev = node;
        dfs(node.right);
    }
}
