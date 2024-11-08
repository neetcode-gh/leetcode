class Solution {
    fun longestPalindrome(s: String): String {
        var start = 0
        var maxL = 0
        
        for (i in 0 until s.length) {
            var l = i
            var r = i
            while (l >= 0 && r < s.length && s[l] == s[r]) {
                if (r - l + 1 > maxL) {
                    start = l
                    maxL = (r - l + 1)
                } 
                l--
                r++
            }
            
            l = i
            r = i + 1
            while (l >= 0 && r < s.length && s[l] == s[r]) {
                if (r - l + 1 > maxL) {
                    start = l
                    maxL = (r - l + 1)
                } 
                l--
                r++
            }          
        }
        
        return s.substring(start, start + maxL)
    }
}
