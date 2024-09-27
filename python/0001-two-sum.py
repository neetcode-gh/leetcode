from typing import List


from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        prevMap = {}  # val -> index

        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i


if __name__ == '__main__':
    s = Solution()
    print(s.twoSum([2, 3, 11, 15, 2], 4))
