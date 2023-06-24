class Solution:
    def removeStars(self, s: str) -> str:
        chars = []
        for char in s:
            if char != "*":
                chars.append(char)
            else:
                chars.pop()

        return "".join(chars)
