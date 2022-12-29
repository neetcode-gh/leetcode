class Solution {
    fun addBinary(a: String, b: String): String {
        var rsum = ""; var carry = 0; var aL = a.length-1; var bL = b.length-1
        while(aL >= 0 || bL >= 0){
            var aBit = if(aL >= 0) a[aL--] else '0'
            var bBit = if(bL >= 0) b[bL--] else '0'
            val sum = aBit.toString().toInt() + bBit.toString().toInt() + carry
            carry = sum / 2
            rsum = (sum % 2).toString() + rsum
        }
        if(carry > 0)
            rsum = '1' + rsum
        return rsum
    }
}
