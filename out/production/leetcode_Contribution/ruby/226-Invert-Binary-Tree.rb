def invert_tree(root)
  return root if root.nil?
  return root if root.left.nil? && root.right.nil?

  root.left, root.right = root.right, root.left
  invert_tree(root.left)
  invert_tree(root.right)
  root
end
