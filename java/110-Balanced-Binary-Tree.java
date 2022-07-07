class Solution {
    public boolean result=true;
    public boolean isBalanced(TreeNode root) {
        dfs(root);
        return result;
    }
    public int dfs(TreeNode root){
        if(root==null)return 0;
        int rd=dfs(root.right)+1;
        int ld=dfs(root.left)+1;
        if(Math.abs(rd-ld)>1) result=false;
        return Math.max(rd,ld);
    }
}
