class Solution {

  public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    TreeNode node = new TreeNode(root.val);
    node.right = invertTree(root.left);
    node.val = root.val;
    node.left = invertTree(root.right);
    return node;
  }
}
