/** 
 * TC : log (n)
 * 
 * */ 
class Solution {
    public TreeNode minimumVal(TreeNode root) {
        TreeNode curr = root;
        while (curr != null && curr.left != null) {
            curr = curr.left;
        }
        return curr;
    }

    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) return null;

        if (key > root.val) {
            root.right = deleteNode(root.right, key);
        } else if (key < root.val) {
            root.left = deleteNode(root.left, key);
        } else {
            if (root.left == null) {
                return root.right;
            } else if (root.right == null) {
                return root.left;
            } else {
                TreeNode minVal = minimumVal(root);
                root.val = minVal.val;
                root.right = deleteNode(root.right, minVal.val);
            }
        }
        return root;
    }
}
