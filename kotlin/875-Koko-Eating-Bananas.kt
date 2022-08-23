class Solution {
    fun minEatingSpeed(piles: IntArray, h: Int): Int {
        var left = 1
        var right = 1

        for (pile in piles) {
            right = Math.max(right, pile)
        }

        while (left < right) {
            val mid = left + (right - left)/2

            if (canEat(piles, h, mid)) {
                right = mid
            } else {
                left = mid+1
            }
        }

        return left
    }

    fun canEat(piles: IntArray, h: Int, speed: Int): Boolean {
        var sum = 0

        for (pile in piles) {
            sum += Math.ceil(pile/speed.toDouble()).toInt()

            if (sum > h)
                return false
        }

        return true
    }
}