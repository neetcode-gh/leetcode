def merge_two_lists(list1, list2)
  return nil if list1.nil? && list2.nil?

  dummy = ListNode.new
  beginning = dummy
  while list1 && list2
    if list1.val > list2.val
      dummy.next = list2
      list2 = list2.next
    else
      dummy.next = list1
      list1 = list1.next
    end
    dummy = dummy.next
  end
  if list1
    dummy.next = list1
  elsif list2
    dummy.next = list2
  end
  beginning.next
end
