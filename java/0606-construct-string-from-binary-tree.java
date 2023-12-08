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
/*                Alternative Solution
-----------------------------------------------------------------*/
class Solution {
    public String tree2str(TreeNode root) {
        StringBuilder res = new StringBuilder();
        dfs(root, res);
        return res.toString().substring(1, res.length()-1);
    }
    private void dfs(TreeNode root, StringBuilder res){
        if(root == null)
            return;

        res.append("(");
        res.append(root.val);
        if(root.left == null && root.right != null)
            res.append("()");
        dfs(root.left, res);
        dfs(root.right, res);
        res.append(")");
    }
}
