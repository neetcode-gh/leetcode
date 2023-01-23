class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:

        stack = []
        for ast in asteroids:
            while stack and ast < 0 and stack[-1] > 0:
                diff = ast + stack[-1]
                if diff < 0:
                    stack.pop()
                elif diff > 0:
                    ast = 0
                else:
                    ast = 0
                    stack.pop()
            if ast != 0:
                stack.append(ast)
        return stack