class Solution {
    fun validPalindrome(s: String): Boolean {

        var left = 0
        var right = s.lastIndex

        while (left <= right) {
            if(s[left] != s[right])
                return isValid(s, left, right -1) || isValid(s, left + 1, right)
            left++
            right--
        }

        return true
    }

    private fun isValid(s: String, _left: Int, _right: Int): Boolean {

        var left = _left
        var right = _right

        while (left <= right) {
            if(s[left] != s[right])
                return false
            left++
            right--
        }

        return true
    }
}
