class Solution:
    def interchangeableRectangles(self, rectangles: List[List[int]]) -> int:
        count = {}  # { W / H : Count }
        res = 0

        for w, h in rectangles:
            # Increment the count for the ratio
            count[w / h] = 1 + count.get(w / h, 0)

        for c in count.values():
            res += (c * (c - 1)) // 2

        return res
