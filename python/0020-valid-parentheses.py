class Solution:
    def isValid(self, s: str) -> bool:
        bracketMap = {")": "(", "]": "[", "}": "{"}
        stack = []

        for c in s:
            if c not in bracketMap:
                stack.append(c)
                continue
            if not stack or stack[-1] != bracketMap[c]:
                return False
            stack.pop()

        return not stack
