class Solution {
	fun trap(height: IntArray): Int {

		var i = 0
		var j = height.size - 1
		var lastHeight = 0
		var area = 0
		while (i <= j) {
			val tmpMin =  Math.min(height[i], height[j])
			if (tmpMin > lastHeight) {
				area += Math.min(height[i] - lastHeight, height[j] - lastHeight) * (j - i + 1)
				lastHeight = Math.max(lastHeight, tmpMin)
			}

			if (height[i] > height[j]) {
				j --
			} else {
				i ++
			}
		}

		var barArea = 0
		height.forEach {
			barArea += it
		}

		return area - barArea
	}
}