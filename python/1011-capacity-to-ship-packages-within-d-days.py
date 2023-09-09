class Solution:
    def shipWithinDays(self, weights: List[int], days: int) -> int:
        l, r = max(weights), sum(weights)
        min_cap = r

        def canShip(cap):
            ships, curCap = 1, cap
            for w in weights:
                if curCap - w < 0:
                    ships += 1
                    curCap = cap
                curCap -= w
            return ships <= days

        while l <= r:
            cap = (l + r) // 2
            if canShip(cap):
                min_cap = min(min_cap, cap)
                r = cap - 1
            else:
                l = cap + 1

        return min_cap



