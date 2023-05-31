class Solution {
    public int[] dfs(TreeNode root){
        if(root == null) return new int[2];

        int []left = dfs(root.left);
        int []right = dfs(root.right);

        int []res = new int[2];

        res[0] = left[1] + right[1] + root.val; //with Root
        res[1] = Math.max(left[0], left[1]) + Math.max(right[0], right[1]); //without Root

        return res;
    }
    public int rob(TreeNode root) {
        int []ans = dfs(root);
        return Math.max(ans[0], ans[1]);
    }
}
