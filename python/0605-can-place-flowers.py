class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        # Solution with O(1) space complexity
        empty = 0 if flowerbed[0] else 1

        for f in flowerbed:
           if f:
               n -= int((empty - 1) / 2)  # int division, round toward zero
               empty = 0
           else:
               empty += 1

        n -= (empty) // 2
        return n <= 0
        
class Solution2:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
       # Another solution with O(1) space complexity
       for i in range(len(flowerbed)):
            if n == 0:
                return True
            if ((i == 0 or flowerbed[i - 1] == 0)   # If at the first element or the previous element equals to 0
                and (flowerbed[i] == 0)             # If current element equals to 0
                and (i == len(flowerbed) - 1 or flowerbed[i + 1] == 0)): # If at the last element or the next element equals to 0
                # Place flower at the current position
                flowerbed[i] = 1
                n -= 1

       return n == 0
       
class Solution3:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
       # Solution with O(n) space complexity
       f = [0] + flowerbed + [0]
       
       for i in range(1, len(f) - 1):  # skip first & last
           if f[i - 1] == 0 and f[i] == 0 and f[i + 1] == 0:
               f[i] = 1
               n -= 1
       return n <= 0
