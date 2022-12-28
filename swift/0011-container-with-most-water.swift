class Solution {
    func maxArea(_ height: [Int]) -> Int {
        var maxArea = 0
        var l = 0
        var r = height.count - 1
        while l < r {
            let lV = height[l]
            let rV = height[r]
            let area = (r - l) * min(rV, lV)
            maxArea = max(area, maxArea)
            l += lV < rV  ? 1 : 0
            r -= lV >= rV ? 1 : 0
        }
        return maxArea
    }
}
