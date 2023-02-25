class Solution {
    fun shipWithinDays(weights: IntArray, days: Int): Int {
        
        var left = Integer.MIN_VALUE
        var right = 0

        for(w in weights) {
            left = maxOf(left, w)
            right += w
        }

        fun canShip(cap: Int): Boolean {
            var currentCap = cap
            var ships = 1
            for(w in weights) {
                if(currentCap - w < 0){
                    ships++
                    currentCap = cap
                }
                currentCap -= w
            }
            return ships <= days
        }

        while(left <= right) {
            val mid = (left + right) / 2
            if(canShip(mid))
                right = mid - 1
            else
                left = mid + 1
        }

        return left
    }
}
