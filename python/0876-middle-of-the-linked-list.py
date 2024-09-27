from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head

        slow = fast = head
        while fast and fast.next:
            slow, fast = slow.next, fast.next.next

        return slow
