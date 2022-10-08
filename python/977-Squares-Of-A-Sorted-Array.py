class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        res = []
        for i in nums:
            res.append(i*i)
        return sorted(res)
        #   return sorted([x**2 for x in nums])
