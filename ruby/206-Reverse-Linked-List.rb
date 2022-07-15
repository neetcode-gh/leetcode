def reverse_list(head)
  next_node = nil
  prev_node = nil
  loop do
    next_node = head.next
    head.next = prev_node
    prev_node = head
    if next_node.nil?
      return head
    else
      head = next_node
    end
  end
end

# Recursive 
def reverse_list(head)
  return head if head.nil?

  new_head = head
  if head.next
    new_head = reverse_list(head.next)
    head.next.next = head
  end

  head.next = nil
  new_head
end
