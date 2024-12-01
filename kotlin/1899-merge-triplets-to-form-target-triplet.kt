class Solution {
    fun mergeTriplets(triplets: Array<IntArray>, target: IntArray): Boolean {
        val filteredTriplets = triplets.filter { triplet ->
            triplet[0] <= target[0] && triplet[1] <= target[1] && triplet[2] <= target[2]
        }
        if (filteredTriplets.isEmpty()) return false
        val matches = booleanArrayOf(false, false, false)
        filteredTriplets.forEach { (x, y, z) ->
            matches[0] = matches[0] || x == target[0]
            matches[1] = matches[1] || y == target[1]
            matches[2] = matches[2] || z == target[2]
        }
        return matches.all { it == true }
    }
}