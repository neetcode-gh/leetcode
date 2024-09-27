# iterative
from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        x = 1
        while x < n:
            x *= 2
        return x == n        

# Bit manipulation
from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0

# Bit manipulation
from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and ((1 << 30) % n) == 0
