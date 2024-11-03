class Solution {
    fun partition(s: String): List<List<String>> {
        val res = mutableListOf<MutableList<String>>()
        val part = mutableListOf<String>()

        fun isPalindrome(_l: Int, _r: Int): Boolean {
            var l = _l
            var r = _r
            while (l < r) {
                if (s[l] != s[r])
                    return false
                l++
                r--
            }
            return true
        }

        fun dfs(i: Int) {
            if (i >= s.length) {
                res.add(part.toMutableList())
                return
            }

            for (j in i until s.length) {
                if (isPalindrome(i, j)) {
                    part.add(s.substring(i, j + 1))
                    dfs(j + 1)
                    part.removeAt(part.lastIndex)
                }
            }
        }
        
        dfs(0)
        return res
    }
}
