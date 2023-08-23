class Solution {
    public String tree2str(TreeNode root) {
        if(root == null) return "";
        String output = String.valueOf(root.val);
        if(root.left != null || root.right != null)
            output += "(" + tree2str(root.left) + ")";
        if(root.right != null) 
            output += "(" + tree2str(root.right) + ")";

        return output;
    }

    
}
