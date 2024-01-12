class Solution {
    int minDiff = Integer.MAX_VALUE;
    int prevValue = -1;

    public int minDiffInBST(TreeNode root) {
        helperMethod(root);
        return minDiff;
    }

    public void helperMethod(TreeNode curr) {
        if (curr == null) return;

        helperMethod(curr.left);

        if (prevValue != -1) {
            minDiff = Math.min(minDiff, Math.abs(curr.val - prevValue));
        }

        prevValue = curr.val;

        helperMethod(curr.right);
    }
}
