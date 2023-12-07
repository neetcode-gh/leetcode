class Solution {
    fun eliminateMaximum(dist: IntArray, speed: IntArray): Int {
        val minReach = dist.zip(speed)
            .map { 
                Math.ceil(it.first.toDouble() / it.second.toDouble()).toInt()
            }.sorted()
        
        var res = 0
        for ((minute, reachesAt) in minReach.withIndex()) {
            if (minute >= reachesAt) break
            res++
        }

        return res
    }
}
