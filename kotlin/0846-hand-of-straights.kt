class Solution {
    fun isNStraightHand(hand: IntArray, groupSize: Int): Boolean {
        if (hand.size % groupSize != 0) return false
        val countMap = mutableMapOf<Int, Int>()
        hand.forEach { countMap[it] = countMap.getOrDefault(it, 0) + 1 }
        val minHeap = PriorityQueue(countMap.keys)

        while (minHeap.isNotEmpty()) {
            val minValue = minHeap.peek()
            if (countMap.getValue(minValue) == 0) {
                minHeap.remove()
                continue
            }
            // loop through consecutive numbers starting from the "minValue" number
            for (consecutiveNumber in minValue until (minValue + groupSize)) {
                if (
                    consecutiveNumber !in countMap.keys ||
                    countMap.getValue(consecutiveNumber) == 0
                ) return false
                countMap[consecutiveNumber] = countMap.getValue(consecutiveNumber) - 1
            }
            // if the loop successfully executes without returning, it indicates that
            // it was possible to create a group of size [groupSize] with minValue
            // as the first element in the group.
        }
        return true
    }
}