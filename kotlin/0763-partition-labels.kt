class Solution {
    fun partitionLabels(s: String): List<Int> {
        if (s.length == 1) return listOf(1)
        val lastIndexOfChar = mutableMapOf<Char, Int>().apply {
            s.forEachIndexed { index, char -> this[char] = index }
        }
        val partitions = mutableListOf<Int>()
        var l = 0
        while (l in s.indices) {
            // keep moving l to find the first char that has a last occurrence greater than l
            while (l == lastIndexOfChar[s[l]]) {
                // if l is at the one-and-only occurrence of the char s[l], make a partition and move l
                partitions.add(1)
                l++
                if (l > s.lastIndex) return partitions
            }

            var r = lastIndexOfChar.getValue(s[l])
            var j = l + 1
            while (j <= r) {
                if (lastIndexOfChar.getValue(s[j]) <= r){
                    j++
                    continue
                }
                r = lastIndexOfChar.getValue(s[j])
                j++
            }
            partitions.add((r - l) + 1)
            l = r + 1
        }
        return partitions
    }
}