class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;
        while(current!=null || !stack.isEmpty()){
            while(current!=null){
                res.add(current.val);
                stack.add(current.right);
                current = current.left;
            }
            current = stack.pop();
        }
        return res;
    }
}
