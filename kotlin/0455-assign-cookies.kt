class Solution {
    fun findContentChildren(g: IntArray, s: IntArray): Int {
        g.sort()
        s.sort()

        var i = 0
        var j = 0
        while (i < g.size) {
            while (j < s.size && g[i] > s[j]) j++
            if (j == s.size) break
            i++
            j++
        }

        return i
    }
}
