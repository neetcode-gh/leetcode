class Solution {
    fun largestRectangleArea(heights: IntArray): Int {
        val st = LinkedList<IntArray>()
        st.push(intArrayOf(-1, 0))
        var max = 0

        for (i in heights.indices) {
            var start = i

            while (!st.isEmpty() && st.peek()[1] > heights[i]) {
                val curr = st.pop()
                val height = curr[1]
                start = curr[0]
                max = Math.max(max, height * (i - start))
            }

            st.push(intArrayOf(start, heights[i]))
        }

        while (!st.isEmpty()) {
            val curr = st.pop()
            max = Math.max(max, curr[1] * (heights.size - curr[0]))
        }

        return max
    }
}