class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head

        mid = self.get_mid(head)
        left, right = self.sortList(head), self.sortList(mid)

        return self.merge_two_sorted(left, right)


    def merge_two_sorted(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        if not list1:
            return list2

        if not list2:
            return list1

        sentinel = ListNode()
        prev = sentinel
        while list1 and list2:
            if list1.val < list2.val:
                prev.next = list1
                list1 = list1.next
            else:
                prev.next = list2
                list2 = list2.next
            prev = prev.next

        if list1:
            prev.next = list1
        else:
            prev.next = list2

        return sentinel.next


    def get_mid(self, head: Optional[ListNode]) -> Optional[ListNode]:
        mid_prev = None
        while head and head.next:
            mid_prev = mid_prev.next if mid_prev else head
            head = head.next.next

        mid = mid_prev.next
        mid_prev.next = None

        return mid
