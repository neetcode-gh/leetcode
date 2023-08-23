package kotlin

class Codec {
    // Encodes a list of strings to a single string.
    fun encode(strs: List<String>): String {
        val stringBuilder = StringBuilder()
        for (string in strs) {
            for (char in string) {
                stringBuilder.append(char.toInt()) // char.code in newer version's of Kotlin
                stringBuilder.append(CHAR_DELIMITER)
            }
            stringBuilder.append(STRING_DELIMITER)
        }
        return stringBuilder.toString()
    }

    // Decodes a single string to a list of strings.
    fun decode(s: String): List<String> {
        val stringBuilder = StringBuilder()
        val resultantList = mutableListOf<String>()
        var i = 0
        while (i in s.indices) {
            while (s[i] != STRING_DELIMITER) {
                var charIntegerValue = ""
                while (s[i] != CHAR_DELIMITER) {
                    charIntegerValue += s[i]
                    i++
                }
                stringBuilder.append(charIntegerValue.toInt().toChar())
                i++
            }
            resultantList.add(stringBuilder.toString())
            stringBuilder.clear()
            i++
        }
        return resultantList
    }

    companion object {
        private const val CHAR_DELIMITER = '|'
        private const val STRING_DELIMITER = '/'
    }
}