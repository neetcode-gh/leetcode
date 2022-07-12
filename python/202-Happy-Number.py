class Solution:
    def isHappy(self, n: int) -> bool:
        slow, fast = n, self.sumSquareDigits(n)
        
        while slow != fast:
            fast = self.sumSquareDigits(fast)
            fast = self.sumSquareDigits(fast)
            slow = self.sumSquareDigits(slow)

        return True if fast == 1 else False
            
    def sumSquareDigits(self, n):
        output = 0
        while n:
            output += (n % 10) ** 2
            n = n // 10
        return output
