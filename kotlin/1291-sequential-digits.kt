class Solution {
    fun sequentialDigits(low: Int, high: Int): List<Int> {
        var q = mutableListOf(1, 2, 3, 4, 5, 6, 7, 8, 9)
        var res = mutableListOf<Int>()

        while (q.isNotEmpty()) {
            var n = q.removeFirst()

            if (n > high) continue
            if (n >= low) res.add(n)

            val d = n % 10
            if (d < 9) q.add(n * 10 + (d + 1))
        }

        return res
    }
}
