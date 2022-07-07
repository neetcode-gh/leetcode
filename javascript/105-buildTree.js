function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

function buildTree(preorder, inorder) {
  function tree(preorder, inorder) {
    if (preorder.length === 0) return null;

    const node = new TreeNode(preorder[0]);
    const index = inorder.indexOf(preorder[0]);

    node.left = tree(preorder.slice(1, index + 1), inorder.slice(0, index));
    node.right = tree(preorder.slice(index + 1), inorder.slice(index + 1));
    return node;
  }
  return tree(preorder, inorder);
};