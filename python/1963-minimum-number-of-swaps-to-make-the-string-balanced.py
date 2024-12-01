class Solution:
    def minSwaps(self, s: str) -> int:
        extraClose, maxClose = 0, 0

        for c in s:
            if c == "[":
                extraClose -= 1
            else:
                extraClose += 1

            maxClose = max(maxClose, extraClose)

        return (maxClose + 1) // 2  # Or math.ceil(maxClose / 2)
