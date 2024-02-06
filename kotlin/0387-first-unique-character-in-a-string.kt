class Solution {
    fun firstUniqChar(s: String): Int {
        var count = IntArray (26)
        for (c in s)
            count[c - 'a']++

        for ((i, c) in s.withIndex()) {
            if (count[c - 'a'] == 1)
                return i
        }
 
        return -1
    }
}
