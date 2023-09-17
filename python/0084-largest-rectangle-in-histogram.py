class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        maxArea = 0
        stack = []  # pair: (index, height)

        for right, short in enumerate(heights):
            start = right
            while stack and short < stack[-1][1]:
                left, tall = stack.pop()
                maxArea = max(maxArea, tall * (right - left))
                start = left
            stack.append((start, short))

        for i, h in stack:
            maxArea = max(maxArea, h * (len(heights) - i))
        return maxArea
