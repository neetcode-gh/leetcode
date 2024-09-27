from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def countOdds(self, low: int, high: int) -> int:
        if low%2!=0 or high%2!=0:
            return (high-low)//2 +1
        return (high-low)//2
