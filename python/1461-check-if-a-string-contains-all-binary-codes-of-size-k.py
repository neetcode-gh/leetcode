from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def hasAllCodes(self, s: str, k: int) -> bool:
        return len(set(s[i : i + k] for i in range(len(s) - k + 1))) == 2**k
