class Solution {
    fun minDeletions(s: String): Int {
        val count = HashMap<Char, Int>().apply {
            for (c in s)
                this[c] = getOrDefault(c, 0) + 1
        }

        val usedFreq = HashSet<Int>()

        var res = 0
        for ((char, freq) in count) {
            var freq = freq
            while (freq > 0 && freq in usedFreq) {
                freq--
                res++
            }
            usedFreq.add(freq)
        }

        return res
    }
}
