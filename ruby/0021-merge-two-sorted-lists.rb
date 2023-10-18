# Iterative solution
def merge_two_lists(list1, list2)
    dummy = ListNode.new
    node = dummy
  
    while list1 && list2
      if list1.val < list2.val
        node.next = list1
        list1 = list1.next
      else
        node.next = list2
        list2 = list2.next
      end
      node = node.next
    end
  
    node.next = list1 || list2
  
    dummy.next
end

# Recursive solution
def merge_two_lists(list1, list2)
    return list2 if list1.nil?
    return list1 if list2.nil?

    if list1.val <= list2.val
        list1.next = merge_two_lists(list1.next, list2)
        return list1
    else
        list2.next = merge_two_lists(list1, list2.next)
        return list2
    end
end
