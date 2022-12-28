def hasCycle(head)
  return false if head.nil?
  return false if head.next.nil?

  dict = {}
  while head
    return true if dict.key?(head)

    dict[head] = true
    head = head.next
  end
  false
end

# Tortoise and Hare solution
def hasCycle(head)
  return false if head.nil?
  return false if head.next.nil?

  fast = head
  while head && fast
    fast = fast.next
    return false if fast.nil?

    fast = fast.next
    head = head.next

    return true if head == fast
  end
  false
end
