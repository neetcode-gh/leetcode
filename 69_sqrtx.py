class Solution:
    def mySqrt(self, y: int) -> int:
        r = 2**31-1  # substitute with literal if eager to avoid ** op even here
        l = 0
        while l <= r:
            m = l + (r - l)//2
            fx = m*m
            if y < fx:
                r = m-1
            elif y > fx:
                l = m+1
            else:
                return m
        return r
      
