class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        if(root == null) return root;

        if(key > root.val){
            root.right = deleteNode(root.right, key);
        }else if(key < root.val){
            root.left = deleteNode(root.left, key);
        }else{
            if(root.left == null) return root.right;
            else if(root.right == null) return root.left;

            TreeNode curr = root.right;
            while(curr.left != null){
                curr = curr.left;
            }
            root.val = curr.val;
            root.right = deleteNode(root.right, root.val);
        }
        return root;
    }
}
