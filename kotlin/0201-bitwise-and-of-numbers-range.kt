// check difference at each bit (cannot be more than left - right)
class Solution {
    fun rangeBitwiseAnd(left: Int, right: Int): Int {
        var res = 0

        for (i in 0 until 32) {
            val bit = (left shr i) and 1
            if (bit == 0) continue

            val remain = left % (1 shl (i + 1))
            val diff = (1 shl (i + 1)) - remain
            if (right - left < diff)
                res = res or (1 shl i)
        }

        return res
    }
}

// find the longest matching prefix of set bits between left and right
class Solution {
    fun rangeBitwiseAnd(left: Int, right: Int): Int {
        var i = 0
        var left = left
        var right = right

        while (left != right) {
            left = left shr 1
            right = right shr 1
            i++
        }

        return left shl i
    }
}

// find the longest matching prefix of set bits between left and right. As above but a little different logically.
class Solution {
    fun rangeBitwiseAnd(left: Int, right: Int): Int {
        var right = right
        
        while (right > left) {
            right = right and (right - 1)
        }

        return right
    }
}
