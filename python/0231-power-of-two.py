# iterative
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        x = 1
        while x < n:
            x *= 2
        return x == n        

# Bit manipulation
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0

# Bit manipulation
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and ((1 << 30) % n) == 0
