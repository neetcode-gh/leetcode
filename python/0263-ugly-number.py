from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def is_ugly(self, n: int) -> bool:
        if n <= 0:
            return False
        
        for p in [2, 3, 5]:
            while n % p == 0:
                n = n // p
        return n == 1


if __name__ == '__main__':
    s = Solution()
    print(s.is_ugly(6))
    print(s.is_ugly(8))
    print(s.is_ugly(130))
