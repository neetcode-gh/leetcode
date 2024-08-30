class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        res = []
        for p in points:
            dist = -(p[0]**2 + p[1]**2)
            if len(res) == k:
                heappushpop(res, (dist, p))
            else:
                heappush(res, (dist, p))
        
        return [p[1] for p in res]
