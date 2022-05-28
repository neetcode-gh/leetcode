// doesn't work with [1, 2]
class Solution {
      private static int treeDiameter = 0;

      public int diameterOfBinaryTree(TreeNode root) {
            calculateHeight(root);
            return treeDiameter-1;
      }

      private static int calculateHeight(TreeNode currentNode) {
            if (currentNode == null) return 0;

      int leftTreeHeight = calculateHeight(currentNode.left);
      int rightTreeHeight = calculateHeight(currentNode.right);

      // if the current node doesn't have a left or right subtree, we can't have
      // a path passing through it, since we need a leaf node on each side
      if (leftTreeHeight != 0 && rightTreeHeight != 0) {

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

/*
      // working one
      class Solution {
    
      public int diameterOfBinaryTree(TreeNode root) {  
            if(root == null){
                  return 0;
            }
        
            int left = diameterOfBinaryTree(root.left);
            int right = diameterOfBinaryTree(root.right);
            int height = getHeight(root.left) + getHeight(root.right);
        
            return Math.max(height, Math.max(left, right));
      }
    
      private int getHeight(TreeNode node){
            if (node == null){
                  return 0;
            }

            int left = getHeight(node.left);
            int right = getHeight(node.right);
        
            return Math.max(left, right) + 1;
    }
}

*/

