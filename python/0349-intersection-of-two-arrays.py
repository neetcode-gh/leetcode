from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        seen = set(nums1)

        res = []
        for n in nums2:
            if n in seen:
                res.append(n)
                seen.remove(n)
        return res        
