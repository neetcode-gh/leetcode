class Solution {
    public boolean isSymmetric(TreeNode root) {
        return dfs(root.left,root.right);
    }
    private boolean dfs(TreeNode a, TreeNode b){
        if(a == null && b == null ){
            return true;
        }
        if(a == null || b == null ){
            return false;
        }else if(a.val != b.val){
            return false;
        }else{ // normal path
            return dfs(a.left,b.right) && dfs(a.right,b.left) ;
        }
    }
}