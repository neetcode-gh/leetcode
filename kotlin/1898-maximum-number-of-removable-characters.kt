class Solution {
    fun maximumRemovals(s: String, p: String, removable: IntArray): Int {
        
        fun isSubseq(removed: HashSet<Int>): Boolean {
            var i = 0
            var j = 0

            while (i < s.length && j < p.length) {
                if (i in removed || s[i] != p[j]) {
                    i++
                    continue
                }
                i++
                j++
            }

            return j == p.length
        }

        var res = 0
        var l = 0
        var r = removable.lastIndex
        while (l <= r) {
            val m = (l + r) / 2

            val removed = HashSet<Int>()
            for (i in 0..m)
                removed.add(removable[i])

            if (isSubseq(removed)) {
                res = maxOf(res, m + 1)
                l = m + 1
            } else {
                r = m - 1
            }
        }

        return res
    }
}
