class Solution {
    public boolean flipEquiv(TreeNode root1, TreeNode root2) {
        if(root1 == null && root2 == null) return true;
        if(root1 == null || root2 == null) return false;
        if(root1.val != root2.val) return false;

        if(flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right)){ //if they are euqal
            return true;
        }
        if(flipEquiv(root1.right, root2.left) && flipEquiv(root1.left, root2.right)){ // if flipped once
            return true;
        }else{
            return false;
        }
    }
}
