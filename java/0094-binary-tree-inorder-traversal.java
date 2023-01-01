class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        //iterative
        List<Integer> res = new ArrayList<>();
        if(root == null) return res;

        Stack<TreeNode> stack = new Stack<>();
        TreeNode node = root;
        while(!stack.isEmpty() || node != null) {
            if(node != null) {
                stack.push(node);
                node = node.left;
            } else {
                node = stack.pop();
                res.add(node.val);
                node = node.right;
            }
        }

        return res;

        //recursive
        // List<Integer> res = new ArrayList<>();
        // dfs(root, res);
        // return res;
    }

    // public void dfs(TreeNode n, List<Integer> res) {
    //     if(n == null) {
    //         return;
    //     }
        
    //     dfs(n.left, res);
    //     res.add(n.val);
    //     dfs(n.right, res);
    // }
}