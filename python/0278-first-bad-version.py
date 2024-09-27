from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def firstBadVersion(self, n: int) -> int:
        l, r = 1, n
        while l < r:
            v = (l + r) // 2
            if isBadVersion(v):
                r = v
            else:
                l = v + 1
        return l
