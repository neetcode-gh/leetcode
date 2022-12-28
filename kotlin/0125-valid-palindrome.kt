class Solution {
    fun isPalindrome(s: String): Boolean {
        val s = s.toLowerCase()
        var i = 0
        var j = s.length - 1
        while (i < j) {
            while (!s[i].isLetterOrDigit() && i < j)
                i++;
            while (!s[j].isLetterOrDigit() && j > i)
                j--;
            if (s[i++] != s[j--]) return false
        }
        return true
    }
}
