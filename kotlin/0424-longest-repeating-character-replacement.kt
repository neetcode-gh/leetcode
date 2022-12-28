class Solution {
    fun characterReplacement(s: String, k: Int): Int {
        val freq = IntArray(26);

        var res = 0
        var currMax = 0
        var start = 0

        for (end in 0..s.length-1) {
            val count = ++freq[s[end] - 'A']
            currMax = Math.max(currMax, count)

            if (end - start + 1 > currMax + k) {
                freq[s[start] - 'A']--
                start++
            }

            res = Math.max(res, end - start + 1)
        }

        return res
    }
}