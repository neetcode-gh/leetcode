class Solution {
    fun maxNumberOfBalloons(text: String): Int {
        val map = IntArray(26)
        text.forEach {
            if(it in "balon") map[it - 'a']++
        }
        var min = Integer.MAX_VALUE
        "balon".forEach {
            if(map[it - 'a'] == 0) return 0
            else if(it == 'l' || it == 'o') min = minOf(min, map[it-'a']/2)
            else min = minOf(min, map[it-'a'])
        }
        return min
    }
}
