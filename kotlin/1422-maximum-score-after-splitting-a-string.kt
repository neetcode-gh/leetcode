class Solution {
    fun maxScore(s: String): Int {
        var zero = 0
        var one = s.count{ it == '1'}
        var res = 0

        for (i in 0 until s.lastIndex) {
            if (s[i] == '0')
                zero++
            else
                one--
            res = maxOf(res, zero + one)
        }

        return res
    }
}
