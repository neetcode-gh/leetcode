class Solution {

    public boolean isSymmetricRecursive(TreeNode root) {
        return checkMirror(root.left, root.right);
    }

    private boolean checkMirror(TreeNode left, TreeNode right) {
        if (left == null && right == null)
            return true;
        
        if (left == null || right == null)
            return false;

        return left.val == right.val && 
                checkMirror(left.left, right.right) &&
                checkMirror(left.right, right.left);
    }

    public boolean isSymmetricIterative(TreeNode root) {
        Deque<Pair<TreeNode, TreeNode>> stack = new ArrayDeque<>();
        stack.addFirst(new Pair<>(root.left, root.right));

        while (stack.size() > 0) {
            Pair<TreeNode, TreeNode> nodes = stack.removeFirst();
            TreeNode left = nodes.getKey();
            TreeNode right = nodes.getValue();
            
            if (left == null && right == null)
                continue;

            if (left == null || right == null || left.val != right.val)
                return false;

            stack.add(new Pair<>(left.left, right.right));
            stack.add(new Pair<>(left.right, right.left));
        }

        return true;
    }
}
