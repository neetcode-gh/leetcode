class Solution {
    fun successfulPairs(spells: IntArray, potions: IntArray, success: Long): IntArray {
        potions.sort()
        val res = IntArray(spells.size)

        for ((i, s) in spells.withIndex()) {
            var left = 0
            var right = potions.lastIndex
            var index = potions.size

            while (left <= right) {
                val mid = left + (right - left) / 2
                if ( s.toLong() * potions[mid].toLong() >= success) {
                    right = mid - 1
                    index = mid
                } else {
                    left = mid + 1
                }      
            }

            res[i] = potions.size - index
        }

        return res
    }
}
