class Solution {

  int result = -1;

  public int diameterOfBinaryTree(TreeNode root) {
    dfs(root);
    return result;
  }

  private int dfs(TreeNode current) {
    if (current == null) {
      return -1;
    }
    int left = 1 + dfs(current.left);
    int right = 1 + dfs(current.right);
    result = Math.max(result, (left + right));
    return Math.max(left, right);
  }
}
