class Solution:
    def leastBricks(self, wall: List[List[int]]) -> int:
        countGap = { 0 : 0 }    # { Position : Gap count }

        for r in wall:
            total = 0   # Position
            for b in r[:-1]:
                total += b
                countGap[total] = 1 + countGap.get(total, 0)

        return len(wall) - max(countGap.values())    # Total number of rows - Max gap
