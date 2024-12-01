class Solution {
    fun replaceElements(arr: IntArray): IntArray {
        val res = IntArray(arr.size)
        var max = -1

        arr.reversed().forEachIndexed { i, value ->
            res[i] = max
            max = maxOf(max, value)
        }
        return res.reversed().toIntArray()
    }
}