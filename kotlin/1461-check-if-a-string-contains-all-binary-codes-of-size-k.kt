/*
* Sliding window technique
*/
class Solution {
    fun hasAllCodes(s: String, k: Int): Boolean {
        val hs = HashSet<String>()
        val uniqueBits = 1 shl k
        for(i in 0..s.lastIndex-k+1) {
            val str = s.substring(i, i + k)
            hs.add(str)
            if(hs.size == uniqueBits) return true
        }
        return false
    }
}

/*
* Kotlin one line solution using Kotlin operations.
*/
class Solution {
    fun hasAllCodes(s: String, k: Int) = s.windowed(k).toHashSet().size == 1 shl k
}
