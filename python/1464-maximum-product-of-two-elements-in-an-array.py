class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        high = secondHigh = 0
        for n in nums:
            if n > high:
                secondHigh = high
                high = n
            else:
                secondHigh = max(n, secondHigh)
        return (high - 1) * (secondHigh - 1)
