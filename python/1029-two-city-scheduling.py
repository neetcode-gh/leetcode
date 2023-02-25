class Solution:
    def twoCitySchedCost(self, costs: List[List[int]]) -> int:
        diffs = []
        for c1, c2 in costs:
            diffs.append([c2 - c1, c1, c2])
        diffs.sort()
        res = 0
        for i in range(len(diffs)):
            if i < len(diffs) / 2:
                res += diffs[i][2]
            else:
                res += diffs[i][1]
        return res