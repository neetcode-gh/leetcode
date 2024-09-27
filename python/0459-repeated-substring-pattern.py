from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def repeatedSubstringPattern(self, s: str) -> bool:
        return s in (s + s)[1:-1]
        
