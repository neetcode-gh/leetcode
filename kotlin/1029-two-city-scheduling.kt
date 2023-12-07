class Solution {
    fun twoCitySchedCost(costs: Array<IntArray>): Int {
        val diffs = mutableListOf<IntArray>().apply {
            costs.forEach { (c1, c2) -> 
                add(intArrayOf(c2 - c1, c1, c2))
            }
        }
        .sortedWith(compareBy { it[0] })
        
        var res = 0
        val k = diffs.size / 2
        return diffs.withIndex()
            .sumBy { (i, a) -> if (i < k) a[2] else a[1] }
    }
}
