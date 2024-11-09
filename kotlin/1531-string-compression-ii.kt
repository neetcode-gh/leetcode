class Solution {
    fun getLengthOfOptimalCompression(s: String, k: Int): Int {
        val cache = HashMap<String, Int>()
        
        fun count(i: Int, k: Int, prev: Char, prevCount: Int): Int {
            cache["$i:$k:$prev:$prevCount"]?.let { return it }
            if (k < 0) return Integer.MAX_VALUE
            if (i == s.length) return 0

            var res = -1
            if (s[i] == prev) {
                val incr = if (prevCount in setOf(1, 9, 99)) 1 else 0
                res = incr + count(i + 1, k, s[i], prevCount + 1)
            } else {
                res = minOf(
                    count(i + 1, k - 1, prev, prevCount),
                    1 + count(i + 1, k, s[i], 1)
                )
            }

            cache["$i:$k:$prev:$prevCount"] = res
            return res
        }

        return count(0, k, 'Z', 0)
    }
}
