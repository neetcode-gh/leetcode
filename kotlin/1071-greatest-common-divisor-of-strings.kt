class Solution {
    fun gcdOfStrings(str1: String, str2: String): String {
        if(str1+str2 != str2+str1) return ""
        val gcd = findGcd(str1.length, str2.length)
        return str1.substring(0, gcd)
    }
    fun findGcd(p: Int, q: Int): Int {
        return if(q == 0) p else findGcd(q, p%q)
    }
}
