from typing import List

from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        res = 0
        for n in nums:
            res = n ^ res
        return res
