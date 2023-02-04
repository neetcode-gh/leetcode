class Solution:
    def insertionSortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head

        sentinel = ListNode()
        curr = head
        while curr:
            prev = sentinel
            while prev.next and curr.val >= prev.next.val:
                prev = prev.next

            curr.next, prev.next, curr = prev.next, curr, curr.next

        return sentinel.next
