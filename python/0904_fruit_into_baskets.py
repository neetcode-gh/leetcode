class Solution:
    def totalFruit(self, fruits: List[int]) -> int:
        tr = {}
        l = r = 0
        res = 0
        while r < len(fruits):
            if fruits[r] not in tr:
                tr[fruits[r]] = 1
            else:
                tr[fruits[r]] += 1
            while len(tr) > 2:
                tr[fruits[l]] -= 1
                if tr[fruits[l]] == 0:
                    del tr[fruits[l]]
                l += 1
            res = max(res, r-l+1)
            r += 1
        return res
