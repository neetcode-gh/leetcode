class Solution:
    def maxPerformance(self, n: int, speed: List[int], efficiency: List[int], k: int) -> int:
        mod = 10 ** 9 + 7
        eng = []
        for eff, spd in zip(efficiency, speed):
            eng.append([eff, spd])
        eng.sort(reverse = True)
        
        res, speed = 0, 0
        minHeap = []
        
        for eff, spd in eng:
            if len(minHeap) == k:
                speed -= heapq.heappop(minHeap)
            speed += spd
            heapq.heappush(minHeap, spd)
            res = max(res, eff * speed)
        return res % mod
