class Solution {
    fun splitString(s: String): Boolean {
        
        fun dfs(i: Int, prev: Double): Boolean {
            if (i == s.length)
                return true
            
            for (j in i until s.length) {
                val digit = s.substring(i, j + 1).toDouble()
                if (digit + 1 == prev && dfs(j + 1, digit))
                    return true
            }

            return false
        }

        for (i in 0 until s.lastIndex) {
            val digit = s.substring(0, i + 1).toDouble()
            if (dfs(i + 1, digit))
                return true
        }

        return false
    }
}
