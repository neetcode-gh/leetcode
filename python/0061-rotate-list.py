class Solution:
    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        if not head or not head.next or k == 0:
            return head

        old_head = head

        curr, size = head, 0
        while curr:
            curr, size = curr.next, size + 1

        if k % size == 0:
            return head

        k %= size
        slow = fast = head
        while fast and fast.next:
            if k <= 0:
                slow = slow.next
            fast = fast.next
            k -= 1

        new_tail, new_head, old_tail = slow, slow.next, fast
        new_tail.next, old_tail.next = None, old_head

        return new_head
