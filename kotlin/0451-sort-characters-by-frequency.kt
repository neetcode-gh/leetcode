// Count and bucketsort by freq
class Solution {
    fun frequencySort(s: String): String {
        val counts = s
            .groupingBy { it }
            .eachCount()

        val buckets = HashMap<Int, MutableList<Char>>()
        for ((char, count) in counts)
            buckets.getOrPut(count) { mutableListOf() }.apply { add(char) }

        val res = StringBuilder()
        for (count in s.length downTo 1) {
            buckets[count]?.forEach { char ->
                repeat (count) {
                    res.append(char)
                }
            }
        }

        return res.toString()
    }
}

// Count and sort
class Solution {
    fun frequencySort(s: String): String {
        val counts = IntArray (128)
        
        for (c in s)
            counts[c.toInt()]++

        val sortedCounts = counts
            .mapIndexed { i, v -> i to v }
            .filter { it.second > 0 }
            .sortedWith(compareBy({ -it.second },{ it.first }))

        val res = StringBuilder ()
        for ((char, count) in sortedCounts) {
            repeat (count) {
                res.append(char.toChar())
            }
        }

        return res.toString()
    }
}
