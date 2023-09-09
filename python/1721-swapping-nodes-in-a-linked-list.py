# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapNodes(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        right_pointer = head
        for _ in range(1, k):
            right_pointer = right_pointer.next
        left_kth_node = right_pointer

        left_pointer = head
        while right_pointer is not None:
            right_kth_node = left_pointer
            right_pointer = right_pointer.next
            left_pointer = left_pointer.next

        left_kth_node.val, right_kth_node.val = right_kth_node.val, left_kth_node.val
        return head
