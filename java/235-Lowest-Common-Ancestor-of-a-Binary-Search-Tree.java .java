package java;

class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {

        while(true){
            if(root.val > q.val && root.val > p.val){
                root = root.left;
            }else if(root.val < q.val && root.val < p.val){
                root = root.right;
            }else{
                return root;
            }

        }
    }
}