import heapq
from typing import List

from python.utils import HeapList


class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        stones = [-s for s in stones]
        heapq.heapify(stones)

        print(stones)

        while len(stones) > 1:
            first = heapq.heappop(stones)
            second = heapq.heappop(stones)
            if second > first:
                heapq.heappush(stones, first - second)

        stones.append(0)
        return abs(stones[0])


# There's a private _heapify_max method.
# https://github.com/python/cpython/blob/1170d5a292b46f754cd29c245a040f1602f70301/Lib/heapq.py#L198
class Solution2(object):
    def lastStoneWeight(self, stones):
        heapq._heapify_max(stones)
        while len(stones) > 1:
            max_stone = heapq._heappop_max(stones)
            diff = max_stone - stones[0]
            if diff:
                heapq._heapreplace_max(stones, diff)
            else:
                heapq._heappop_max(stones)
        
        stones.append(0)
        return stones[0]


class Solution3(object):
    def lastStoneWeight(self, stones):
        h_stones = HeapList(is_root_min=False)
        h_stones.heapify(stones)

        while len(h_stones) > 1:
            max_stone = h_stones.heappop()
            diff = max_stone - h_stones[0]
            if diff:
                h_stones.heappop()
                h_stones.heappush(diff)
            else:
                h_stones.heappop()

        h_stones.heappush(0)
        return h_stones[0]


if __name__ == '__main__':
    s = Solution()
    print(s.lastStoneWeight([4, 3, 2, 1]))

    print("-"*3)
    s2 = Solution3()
    print(s2.lastStoneWeight([4, 3, 92, 2, 88]))
    print(s2.lastStoneWeight([1, 2, 7, 4, 8, 11]))
    print(s2.lastStoneWeight([2, 7, 4, 1, 8, 99, 70, 1]))
