class Solution {
    fun carPooling(trips: Array<IntArray>, capacity: Int): Boolean {
        val stops = IntArray (1001)
        for ((pas, pick, drop) in trips) {
            stops[pick] += pas
            stops[drop] -= pas
        }

        var pas = 0
        for (i in 0..1000) {
            pas += stops[i]
            if (pas > capacity)
                return false
        }

        return true
    }
}
