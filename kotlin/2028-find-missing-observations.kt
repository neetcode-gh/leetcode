class Solution {
    fun missingRolls(rolls: IntArray, mean: Int, _n: Int): IntArray {
        val m = rolls.size
        var n = _n
        var nTotal = (mean * (n + m)) - (rolls.sum() ?: 0)

        if (nTotal < n || nTotal > n * 6)
            return IntArray (0)
        
        var res = LinkedList<Int>()
        while (nTotal > 0) {
            val dice = minOf(nTotal - n + 1, 6)
            res.add(dice)
            nTotal -= dice
            n--
        }

        return res.toIntArray()
    }
}
