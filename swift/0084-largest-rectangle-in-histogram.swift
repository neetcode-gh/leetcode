/**
 * Question Link: https://leetcode.com/problems/largest-rectangle-in-histogram/
 */

class LargestRectangleInHistogram {
    func largestRectangleArea(_ heights: [Int]) -> Int {
        var maxArea = 0
        var stack = [(Int, Int)]()

        for (i, h) in heights.enumerated() {
            var start = i
            while !stack.isEmpty && stack.last!.1 > h {
                let (index, height) = stack.removeLast()
                maxArea = max(maxArea, height * (i - index))
                start = index
            }
            stack.append((start, h))
        }

        for (i, h) in stack {
            maxArea = max(maxArea, h * (heights.count - i))
        }

        return maxArea
    }
}