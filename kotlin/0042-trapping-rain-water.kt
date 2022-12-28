import kotlin.math.max

class Solution {
    fun trap(height: IntArray): Int {
        var volumeOfWaterTrapped = 0
        var l = 0
        var r = height.lastIndex
        var currentLeftMax = -1
        var currentRightMax = -1

        while (l < r) {
            if (height[l] <= height[r]) {
                currentLeftMax = max(currentLeftMax, height[l])
                l++
                volumeOfWaterTrapped += (currentLeftMax - height[l]).coerceAtLeast(0)
            } else {
                currentRightMax = max(currentRightMax, height[r])
                r--
                volumeOfWaterTrapped += (currentRightMax - height[r]).coerceAtLeast(0)
            }
        }
        return volumeOfWaterTrapped
    }
}