function goodNodes(root) {
  let total = 0;

  function traverse(node, prev) {
    if (!node) return;

    if (node.left || node.right) {
      traverse(node.left, Math.max(node.val, prev));
      traverse(node.right, Math.max(node.val, prev));
    }

    if (node.val >= prev) {
      total += 1;
    }
  }

  traverse(root, root.val);

  return total;
}
