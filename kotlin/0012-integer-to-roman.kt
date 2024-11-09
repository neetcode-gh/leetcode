class Solution {
    fun intToRoman(_num: Int): String {
        val symList = listOf(
            "I" to 1,
            "IV" to 4,
            "V" to 5,
            "IX" to 9,
            "X" to 10,
            "XL" to 40,
            "L" to 50,
            "XC" to 90,
            "C" to 100,
            "CD" to 400,
            "D" to 500,
            "CM" to 900,
            "M" to 1000
        )

        return buildString {
            var num = _num
            for ((sym, value) in symList.reversed()) {
                if (num / value > 0) {
                    val count = num / value
                    append(sym.repeat(count))
                    num = num % value
                }
            }
        }
    }
}
