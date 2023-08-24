def merge_k_lists(lists)
  return if lists.size == 0

  while lists.size > 1
    merged_lists = []
    (0..lists.size-1).step(2) do |i|
      l1 = lists[i]
      l2 = lists[i+1]
      merged_lists << merge_lists(l1, l2)
    end
    lists = merged_lists
  end

  lists[0]
end

def merge_lists(l1, l2)
  dummy = ListNode.new
  tail = dummy

  while l1 && l2
    if l1.val < l2.val
      tail.next = l1
      l1 = l1.next
    else
      tail.next = l2
      l2 = l2.next
    end
    tail = tail.next
  end
  tail.next = l1 if l1
  tail.next = l2 if l2

  dummy.next
end
