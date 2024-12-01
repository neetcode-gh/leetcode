class Solution {
    fun lengthOfLastWord(s: String): Int {
        var p = s.length-1
        while(s[p].isWhitespace()) p--
        var count = 0
        while(p >= 0 && !s[p].isWhitespace()){
            count++
            p--
        }
        return count
    }
}
