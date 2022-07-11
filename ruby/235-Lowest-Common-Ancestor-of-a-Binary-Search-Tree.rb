def lowest_common_ancestor(root, p, q)
  return root if root.val == p.val || root.val == q.val
  return root if root.val.between?(p.val, q.val) || root.val.between?(q.val, p.val)

  if root.val > p.val
    lowest_common_ancestor(root.left, p, q)
  else
    lowest_common_ancestor(root.right, p, q)
  end
end
