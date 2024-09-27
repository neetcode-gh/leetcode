from typing import List

from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def getConcatenation(self, nums: List[int]) -> List[int]:
        ans = []
        for i in range(2):
            for n in nums:
                ans.append(n)
        return ans
