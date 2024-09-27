from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        res = len(nums)

        for i in range(len(nums)):
            res += i - nums[i]
        return res
