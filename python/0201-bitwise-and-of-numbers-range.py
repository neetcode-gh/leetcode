# check difference at each bit (cannot be more than left - right)
class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        res = 0

        for i in range(32):
            bit = (left >> i) & 1
            if not bit:
                continue
            
            remain = left % (1 << (i + 1))
            diff = (1 << (i + 1)) - remain
            if right - left < diff:
                res = res | (1 << i)
        return res

# find the longest matching prefix of set bits between left and right
class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        i = 0
        while left != right:
            left = left >> 1
            right = right >> 1
            i += 1
        return left << i
