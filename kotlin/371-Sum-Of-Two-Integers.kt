class Solution {
    fun getSum(a: Int, b: Int): Int {
        var a1 = a
        var b1 = b
        var carry = a1.and(b1)
        while (carry != 0) {
            b1 = a1.xor(b1)
            a1 = carry.shl(1)
            carry = a1.and(b1)
        }
        return a1.xor(b1)
    }
}