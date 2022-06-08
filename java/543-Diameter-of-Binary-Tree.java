class Solution {
      
  private static int treeDiameter = 0;

  public int diameterOfBinaryTree(TreeNode root) {
    calculateHeight(root);
    int result = treeDiameter-1;
    treeDiameter = 0;
    return Math.max(0, result);    
  }

  private static int calculateHeight(TreeNode currentNode) {
    if (currentNode == null)
      return 0;

    int leftTreeHeight = calculateHeight(currentNode.left);
    int rightTreeHeight = calculateHeight(currentNode.right);

    if (leftTreeHeight != 0 || rightTreeHeight != 0) {

      // diameter at the current node will be equal to the height of left subtree +
      // the height of right sub-trees + '1' for the current node
      int diameter = leftTreeHeight + rightTreeHeight + 1;

      // update the global tree diameter
      treeDiameter = Math.max(treeDiameter, diameter);
    }

    // height of the current node will be equal to the maximum of the heights of
    // left or right subtrees plus '1' for the current node
    return Math.max(leftTreeHeight, rightTreeHeight) + 1;
  }
}
