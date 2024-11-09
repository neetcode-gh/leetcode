class Solution {
    fun partitionString(s: String): Int {
        val hs = HashSet<Char>()
        var res = 0

        for (c in s) {
            if (hs.contains(c)) {
                res++
                hs.clear()
            }
            hs.add(c)
        }
        
        return if(hs.size != 0) res + 1 else res
    }
}
