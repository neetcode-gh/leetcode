from collections import Counter


from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def maxNumberOfBalloons(self, text: str) -> int:
        countText = Counter(text)
        balloon = Counter("balloon")

        res = len(text)  # or float("inf")
        for c in balloon:
            res = min(res, countText[c] // balloon[c])
        return res
