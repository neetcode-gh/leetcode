from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 3:
            return n
        n1, n2 = 2, 3

        for i in range(4, n + 1):
            temp = n1 + n2
            n1 = n2
            n2 = temp
        return n2


if __name__ == '__main__':
    solution = Solution()
    print(solution.climbStairs(5))

# 70, 206, 7
