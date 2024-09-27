from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        count = 0
        chars = set(s)
        for char in chars:
            first,last = s.find(char),s.rfind(char)
            count += len(set(s[first+1:last]))
        return count