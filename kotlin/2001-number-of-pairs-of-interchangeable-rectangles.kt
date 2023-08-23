class Solution {
    fun interchangeableRectangles(rectangles: Array<IntArray>): Long {
        val count = HashMap<Double, Long>()

        for ((w, h) in rectangles) {
            val d = w.toDouble() / h.toDouble()
            count[d] = count.getOrDefault(d, 0L) + 1L
        }

        var res = 0L
        for (c in count.values) {
            if (c > 1) {
                res += (c * (c - 1)) / 2
            }         
        }

        return res
    }
}
