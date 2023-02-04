object Solution {
    def isInterleave(s1: String, s2: String, s3: String): Boolean = {
        val c1 = s1.toCharArray()
        val c2 = s2.toCharArray()
        val c3 = s3.toCharArray()
        val m = s1.length()
        val n = s2.length()
        if(m + n != s3.length()) false;
        else dfs(c1, c2, c3, 0, 0, 0, Array.ofDim[Boolean](m+1, n+1))
    }

    def dfs(c1: Array[Char], c2: Array[Char], c3: Array[Char], i:Int, j:Int, k:Int, invalid: Array[Array[Boolean]]): Boolean = {
        if(invalid(i)(j)) return false
        if(k == c3.length) return true
        val valid =
            i < c1.length && c1(i) == c3(k) && dfs(c1, c2, c3, i + 1, j, k + 1, invalid) ||
                j < c2.length && c2(j) == c3(k) && dfs(c1, c2, c3, i, j + 1, k + 1, invalid)
        if(!valid) invalid(i)(j) = true
        valid
    }
}
