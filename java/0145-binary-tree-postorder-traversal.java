class Solution {
    // Iterative
    public List<Integer> postorderTraversal(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        stack.add(root);
        Stack<Boolean> visit = new Stack<>();
        visit.add(false);

        List<Integer> res = new ArrayList<>();

        while(!stack.isEmpty()){
            TreeNode curr=stack.pop();
            boolean v = visit.pop();
            if(curr != null){
                if(v != false){
                    res.add(curr.val);
                }else{
                    stack.add(curr);
                    visit.add(true);
                    stack.add(curr.right);
                    visit.add(false);
                    stack.add(curr.left);
                    visit.add(false);
                }
            }
        }
        return res;
    }
}

class Solution {
    // Recursive
    public void postorder(TreeNode root, List<Integer> res){
        if(root == null) return;

        postorder(root.left, res);
        postorder(root.right, res);
        res.add(root.val);
    }
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();

        postorder(root, res);
        return res;
    }
}
