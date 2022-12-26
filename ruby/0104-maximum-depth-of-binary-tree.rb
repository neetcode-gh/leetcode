def max_depth(root)
  return 0 if root.nil?
  return 1 if root.left.nil? && root.right.nil?

  left = 1 + max_depth(root.left)
  right = 1 + max_depth(root.right)
  left > right ? left : right
end
