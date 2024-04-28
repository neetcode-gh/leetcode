// Recursive solution
class Solution {
    private int curSum = 0;

    public TreeNode convertBST(TreeNode root) {
         convertBSTRecursive(root);
         return root;
    }

    private void convertBSTRecursive(TreeNode node) {
        if (node == null) {
            return;
        }

        convertBSTRecursive(node.right);
        int temp = node.val;
        node.val += curSum;
        curSum += temp;
        convertBSTRecursive(node.left);
    }
}

// Iterative solution
class Solution {
    public TreeNode convertBST(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode cur = root;

        int curSum = 0;
        while (cur != null || !stack.isEmpty()) {
            while (cur != null) {
                stack.push(cur);
                cur = cur.right;
            }
            cur = stack.pop();
            cur.val += curSum;
            curSum = cur.val;
            cur = cur.left;
        }

        return root;
    }
}
