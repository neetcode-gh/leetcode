class Solution:
    def decodeString(self, s: str) -> str:
        stack = []
        
        for char in s:
            if char is not "]":
                stack.append(char)
            else:
                sub_str = ""
                while stack[-1] is not "[":
                    sub_str = stack.pop()+sub_str
                stack.pop()

                multiplier = ""
                while stack and stack[-1].isdigit():
                    multiplier = stack.pop() + multiplier

                stack.append(int(multiplier)*sub_str)

        return "".join(stack)  