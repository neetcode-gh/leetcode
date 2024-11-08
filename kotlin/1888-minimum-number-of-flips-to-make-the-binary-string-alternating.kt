/*
* O(N) memory
*/
    fun minFlips(s: String): Int {
        var s2 = s + s
        var sb1 = StringBuilder()
        var sb2 = StringBuilder()
        
        for (i in 0 until s2.length) {
            if (i % 2 == 0) {
                sb1.append('1')
                sb2.append('0')
            } else {
                sb1.append('0')
                sb2.append('1')
            }
        }

        val alt1 = sb1.toString()
        val alt2 = sb2.toString()
        var res = s2.length
        var diff1 = 0
        var diff2 = 0
        var left = 0
        
        for (right in 0 until s2.length) {
            if (s2[right] != alt1[right])
                diff1++
            if (s2[right] != alt2[right])
                diff2++
            if (right - left + 1 > s.length) {
                if (s2[left] != alt1[left])
                    diff1--
                if (s2[left] != alt2[left])
                    diff2--
                left++
            }

            if (right - left + 1 == s.length)
                res = minOf(res, diff1, diff2)
        }

        return res
    }
}

/*
* O(1) memory
*/
class Solution {
    fun minFlips(s: String): Int {
        val n = s.length
        var diff1 = 0
        var diff2 = 0
        var res = n

        for (i in 0 until n * 2) {
            val sChar = s[i % n]
            val is0 = if (i % 2 == 0) '0' else '1'
            if (sChar != is0)
                diff1++
            else
                diff2++
            
            if (i >= n) {
                val firstCharInWindow = if ((i - n) % 2 == 0) '0' else '1'
                if (firstCharInWindow != s[i - n])
                    diff1--
                else
                    diff2--

                res = minOf(res, diff1, diff2)
            }
        }

        return res
    }
}
