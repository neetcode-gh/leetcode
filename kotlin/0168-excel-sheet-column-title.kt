class Solution {
    fun convertToTitle(_cN: Int) = buildString {
        var cN = _cN
        while (cN > 0) {
            val rem = (cN - 1) % 26
            val char = 'A' + rem
            insert(0, char)
            cN = (cN - 1) / 26
        }
    }
}
