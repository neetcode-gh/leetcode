def is_same_tree(p, q)
  if p.nil? && q.nil?
    true
  elsif p && q
    (p.val == q.val) &&
      is_same_tree(p.left, q.left) &&
      is_same_tree(p.right, q.right)
  else
    false
  end
end
