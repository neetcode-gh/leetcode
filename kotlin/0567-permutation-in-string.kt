class Solution {
    fun checkInclusion(s1: String, s2: String): Boolean {
        val map = HashMap<Char, Int>()

        for (c in s1.toCharArray())
            map[c] = map.getOrDefault(c, 0)+1

        var count = map.size
        var st = 0

        for (end in 0..s2.length-1) {
            val curr = s2[end]

            if (map.containsKey(curr)) {
                map[curr] = map[curr]!!-1
                if (map[curr] == 0)
                    count--
            }

            while (count == 0) {
                val temp = s2[st]

                if (map.containsKey(temp)) {
                    map[temp] = map[temp]!! + 1
                    if (map[temp]!! > 0)
                        count++
                }

                if (end - st + 1 == s1.length)
                    return true

                st++
            }
        }

        return false
    }
}