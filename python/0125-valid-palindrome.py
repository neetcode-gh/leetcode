from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def isPalindrome(self, s: str) -> bool:
        new = ''
        for a in s:
            if a.isalpha() or a.isdigit():
                new += a.lower()
        return (new == new[::-1])
