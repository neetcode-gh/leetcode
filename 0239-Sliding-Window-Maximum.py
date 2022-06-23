class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        indexQ = deque()
        valQ = deque()
        
        res = []
        for i, n in enumerate(nums):
            while valQ and n > valQ[-1]:
                valQ.pop()
                indexQ.pop()
            valQ.append(n)
            indexQ.append(i)
            
            while i - indexQ[0] + 1 > k:
                valQ.popleft()
                indexQ.popleft()
            if i + 1 >= k:
                res.append(valQ[0])
        return res
