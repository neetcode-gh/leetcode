from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def hammingWeight(self, n: int) -> int:
        res = 0
        while n:
            n &= n - 1
            res += 1
        return res

def hammingWeight(n):
    count = 0
    print('-'*80)
    print(n, count)
    while n:
        n &= (n - 1)  # Clear the least significant `1` bit
        count += 1
        print(n, count)
    return count

# Example usage:
n1 = 0b00000000000000000000000000001011
print(hammingWeight(n1))  # Output: 3

n2 = 0b00000000000000000000000010000000
print(hammingWeight(n2))  # Output: 1

n3 = 0b11111111111111111111111111111101
print(hammingWeight(n3))  # Output: 31
