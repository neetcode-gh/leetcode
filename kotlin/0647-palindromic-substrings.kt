/*
* Two pointer with outwards extension solution, time O(N^2) and space O(1)
*/
class Solution {
    fun countSubstrings(s: String): Int {
        var res = 0

        for(i in s.indices) {

            var l = i
            var r = i

            while(l >= 0 && r < s.length && s[l] == s[r]) {
                res++
                l--
                r++
            }

            l = i
            r = i+1

            while(l >= 0 && r < s.length && s[l] == s[r]) {
                res++
                l--
                r++
            }

        }
        return res
    }
}

/*
* Two pointer with outwards extension solution, but with helper function. time O(N^2) and space O(1)
*/
class Solution {
    fun countSubstrings(s: String): Int {
        var res = 0
        fun extend(_l: Int, _r: Int) {
            var l = _l
            var r = _r
            while(l >= 0 && r < s.length && s[l] == s[r]) {
                res++
                l--
                r++
            }
        }
        for(i in s.indices) {
            extend(i,i)
            extend(i,i+1)
        }
        return res
    }
}

/*
* DP solution, time O(N^2) and space O(N^2)
*/
class Solution {
    fun countSubstrings(s: String): Int {
        var res = 0
        val dp = Array(s.length){ BooleanArray(s.length) }
        for(i in s.lastIndex downTo 0) {
            for(j in i..s.lastIndex) {
                dp[i][j] = s[i] == s[j] && (j-i+1 < 3 || dp[i+1][j-1])
                if(dp[i][j]) res++
            }
        }
        return res
    }
}
