class Solution {
    fun addToArrayForm(num: IntArray, k: Int): List<Int> {
        var carry = 0
        var toAdd = k
        val res = ArrayList<Int>()
        var pointer = num.size-1
        while(pointer >= 0 || toAdd > 0 || carry != 0) {
            val rightMostMask = toAdd % 10
            var temp = rightMostMask + carry
            if(pointer >= 0)
                temp += num[pointer]
            carry = 0
            if(temp >= 10){
                temp = temp % 10
                carry = 1
            }
            res.add(0, temp)
            toAdd = toAdd / 10
            pointer--
        }
        return res
    }
}
