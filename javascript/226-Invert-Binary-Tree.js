var invertTree = function(root) {
    if (!root) {
        return null;
    }
  
    // To swap without a temporary variable:
    // [root.left, root.right] = [root.right, root.left]
  
    const tmp = root.left;
    root.left = root.right;
    root.right = tmp;
    
    invertTree(root.left);
    invertTree(root.right);    
    
    return root;
};
