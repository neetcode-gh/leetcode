class Solution(object):
    def validateStackSequences(self, pushed, popped):
        i = 0
        stack = []
        for n in pushed:
            stack.append(n)
            while i < len(popped) and stack and popped[i] == stack[-1]:
                stack.pop()
                i += 1

        return not stack


