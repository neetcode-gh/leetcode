# Use a heap
class Solution:
    def findLeastNumOfUniqueInts(self, arr: List[int], k: int) -> int: 
        freq = Counter(arr)
        heap = list(freq.values())
        heapq.heapify(heap)

        res = len(heap)
        while k > 0 and heap:
            f = heapq.heappop(heap)
            if k >= f:
                k -= f
                res -= 1
        return res

# Use buckets
class Solution:
    def findLeastNumOfUniqueInts(self, arr: List[int], k: int) -> int: 
        freq = Counter(arr)
        freqList = [0] * (len(arr) + 1)

        for n, f in freq.items():
            freqList[f] += 1

        res = len(freq)
        for f in range(1, len(freqList)):
            remove = freqList[f]
            if k >= f * remove:
                k -= f * remove
                res -= remove
            else:
                remove = k // f
                res -= remove
                break
        return res
