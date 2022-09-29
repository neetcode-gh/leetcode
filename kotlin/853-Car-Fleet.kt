package kotlin

class Solution {
    fun carFleet(target: Int, position: IntArray, speed: IntArray): Int {
        val sortedPairs = position
            .zip(speed)
            .sortedBy { (position, _) -> position }
        var numberOfFleets = 1
        var timeRequiredForCarInFrontToReachInTarget =
            (target - sortedPairs[sortedPairs.lastIndex].first) / sortedPairs[sortedPairs.lastIndex].second.toFloat()
        var timeRequiredForCurrentCarToReachTarget: Float
        for (i in (sortedPairs.lastIndex - 1) downTo 0) {
            timeRequiredForCurrentCarToReachTarget = (target - sortedPairs[i].first) / sortedPairs[i].second.toFloat()
            if (timeRequiredForCurrentCarToReachTarget > timeRequiredForCarInFrontToReachInTarget) {
                // the current car requires more time to reach the destination
                // than the car in front of it.
                numberOfFleets++
                timeRequiredForCarInFrontToReachInTarget = timeRequiredForCurrentCarToReachTarget
            }
        }
        return numberOfFleets
    }
}



}