class Solution {
    fun leastBricks(wall: List<List<Int>>): Int {
        val count = HashMap<Int, Int>()

        for (row in wall) {
            var total = 0
            for (i in 0 until row.lastIndex) {
                total += row[i]
                count[total] = count.getOrDefault(total, 0) + 1
            }
        }
        
        return wall.size - (count.values.max() ?: 0)
    }
}
