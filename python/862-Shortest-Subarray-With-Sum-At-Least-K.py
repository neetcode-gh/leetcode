import collections
class Solution:
    def shortestSubarray(self, nums: List[int], k: int) -> int:
        size = len(nums)
        pre = [0]
        for i in nums:
            pre.append(pre[-1] + i)

        ans = size + 1
        monoq = collections.deque()
        for i, val in enumerate(pre):
            while monoq and val <= pre[monoq[-1]]:
                monoq.pop()
            while monoq and val - pre[monoq[0]] >= k:
                ans = min(ans, i - monoq.popleft())
            
            monoq.append(i)
        
        return ans if ans < size + 1 else -1   