function buildTree(preorder, inorder) {
  if (!preorder.length || !inorder.length) return null;

  let root = new TreeNode(preorder[0]);
  let mid = inorder.indexOf(preorder[0]);

  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
  return root;
}
