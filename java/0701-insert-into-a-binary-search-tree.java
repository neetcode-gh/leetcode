class Solution {
    public TreeNode insertIntoBST(TreeNode root, int val) {
        if(root == null) return new TreeNode(val);
        TreeNode curr = root;
        while(true){
            if(curr.val <= val){
                if(curr.right != null){
                    curr = curr.right;
                }else{
                    curr.right = new TreeNode(val);
                    break;
                }
            }else{
                if(curr.left != null) curr = curr.left;
                else{
                    curr.left = new TreeNode(val);
                    break;
                }
            }
        }
        return root;
    }

  /*          Using Recursive Solution
  -------------------------------------------------------------------
     public TreeNode insertIntoBST(TreeNode root, int val) {
        if(root == null) return new TreeNode(val);
        if(root.val <= val){
            root.right = insertIntoBST(root.right, val); 
        }else{
            root.left = insertIntoBST(root.left, val);
        }
        return root;
    }
  -------------------------------------------------------------------
  */  
}
