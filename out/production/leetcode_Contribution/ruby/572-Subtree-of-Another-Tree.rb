def is_subtree(root, sub_root)
  return true if root.nil? && sub_root.nil?
  return true if sub_root.nil?
  return false if root.nil?

  if same_tree?(root, sub_root)
    true
  else
    is_subtree(root.left, sub_root) ||
      is_subtree(root.right, sub_root)
  end
end

def same_tree?(p, q)
  if p.nil? && q.nil?
    true
  elsif p && q
    (p.val == q.val) &&
      same_tree?(p.left, q.left) &&
      same_tree?(p.right, q.right)
  else
    false
  end
end
