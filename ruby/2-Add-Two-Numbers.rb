# Definition for singly-linked list.
# class ListNode
#     attr_accessor :val, :next
#     def initialize(val = 0, _next = nil)
#         @val = val
#         @next = _next
#     end
# end
# @param {ListNode} l1
# @param {ListNode} l2
# @return {ListNode}
def add_two_numbers(l1, l2)
    dummy_head = ListNode.new()
    curr = dummy_head
    
    carry = 0
    while l1 || l2 || carry > 0
        l1_val = l1 ? l1.val : 0
        l2_val = l2 ? l2.val : 0
        
        sum = l1_val + l2_val + carry
        ones = sum % 10
        carry = sum / 10

        curr.next = ListNode.new(ones)
        
        curr = curr.next
        l1 = l1.next if l1
        l2 = l2.next if l2
    end

    dummy_head.next
end
