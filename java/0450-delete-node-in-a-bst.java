class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    public TreeNode(int val) {
        this.val = val;
    }
}

class Solution {
    public int minimumVal(TreeNode root) {
        TreeNode curr = root;
        while (curr != null && curr.left != null) {
            curr = curr.left;
        }
        return curr.val;
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
                int minVal = minimumVal(root.right); // Use minimumVal on the right subtree
                root.val = minVal;
                root.right = deleteNode(root.right, minVal);
            }
        }
        return root;
    }
}
