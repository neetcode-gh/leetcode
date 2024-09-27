from typing import Optional

from python.utils import SLLNode


# Definition for singly-linked list.


# Iterative
from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def merge_two_lists_iter(self, list1: SLLNode, list2: SLLNode) -> SLLNode:
        dummy = node = SLLNode()

        while list1 and list2:
            if list1.val < list2.val:
                node.next = list1
                list1 = list1.next
            else:
                node.next = list2
                list2 = list2.next
            node = node.next

        node.next = list1 or list2

        return dummy.next

    def merge_two_lists_recur(self, list1: Optional[SLLNode], list2: Optional[SLLNode]) -> Optional[SLLNode]:
        if not list1:
            return list2
        if not list2:
            return list1
        lil, big = (list1, list2) if list1.val < list2.val else (list2, list1)
        lil.next = self.merge_two_lists_recur(lil.next, big)
        return lil


if __name__ == '__main__':
    list1 = SLLNode(1).link_next(SLLNode(2)).link_next(SLLNode(3))
    list2 = SLLNode(4).link_next(SLLNode(5)).link_next(SLLNode(7)).link_next(SLLNode(19))

    print(Solution().merge_two_lists_iter(list1, list2))

    x = Solution().merge_two_lists_recur(list1, list2)
    print(x)
