class Solution:
    def arraySign(self, nums: List[int]) -> int:
        flag = True
        for i in nums:
            if i == 0:
                return 0
            if i < 0:
                flag = not flag
        
        return 1 if flag else -1
