from typing import List


from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        res = nums[0]

        total = 0
        for n in nums:
            total += n
            res = max(res, total)

            print(f'n: {n}, total: {total}, res: {res}')
            if total < 0:
                total = 0
        return res


if __name__ == '__main__':
    s = Solution()
    print(s.maxSubArray([-4, -1, -5, -78, -24]))
