class Solution {
    func trap(_ height: [Int]) -> Int {
        if height == nil {
            return 0
        }
        
        var res = 0
        var l = 0
        var r = height.count - 1
        
        var leftMax = height[l]
        var rightMax = height[r]
        
        while l < r {
            if leftMax < rightMax {
                l += 1
                leftMax = max(leftMax, height[l])
                res += leftMax - height[l]
            } else {
                r -= 1
                rightMax = max(rightMax, height[r])
                res += rightMax - height[r]
            }
        }
        
        return res
        
    }
    
}
