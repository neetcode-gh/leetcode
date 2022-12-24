func trap(height []int) int {
    if height == nil {
        return 0
    }
    
    left, right := 0, len(height) - 1
    leftMax, rightMax := height[left], height[right]
    res := 0
    
    for left < right {
        if leftMax < rightMax {
            left += 1
            leftMax = max(leftMax, height[left])
            res += leftMax - height[left]
        } else {
            right -= 1
            rightMax = max(rightMax, height[right])
            res += rightMax - height[right]
        }
    }
    return res
}

// Golang does not have a built-in max for integers
func max(a int, b int) int {
    if a > b {
        return a;
    }
    return b;
}