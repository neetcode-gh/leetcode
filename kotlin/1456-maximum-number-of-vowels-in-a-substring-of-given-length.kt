class Solution {
    fun maxVowels(s: String, k: Int): Int {
        val vowels = hashSetOf('a', 'e', 'i', 'o', 'u')

        var count = 0
        var max = 0
        var i = 0

        while (i < k) {
            if (s[i] in vowels) count++
            max = maxOf(max, count)
            i++
        }

        while (i < s.length) {
            count += if (s[i] in vowels) 1 else 0
            count -= if (s[i - k] in vowels) 1 else 0
            max = maxOf(max, count)
            i++
        }

        return max
    }
}
