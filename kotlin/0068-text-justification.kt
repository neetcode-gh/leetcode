//opted out of using StringBuilder, instead used Kotlins plus operator to create new Strings
class Solution {
    fun fullJustify(words: Array<String>, maxWidth: Int): List<String> {
        val res = mutableListOf<String>()
        var line = mutableListOf<String>()
        var length = 0
        var i = 0

        while (i < words.size) {
            if (length + line.size + words[i].length > maxWidth) {
                val extraSpace = maxWidth - length
                val spaces = extraSpace / maxOf(1, line.size - 1)
                var remainder = extraSpace % maxOf(1, line.size - 1)

                for (j in 0 until maxOf(1, line.lastIndex)) {
                    line[j] += " ".repeat(spaces)
                    if (remainder > 0) {
                        line[j] += " "
                        remainder--
                    }
                }

                var whole = ""
                for (l in line) whole += l
                res.add(whole)
                line.clear()
                length = 0
            }

            line.add(words[i])
            length += words[i].length
            i++
        }

        var lastLine = "" + line.joinToString(" ")
        val trailSpace = maxWidth - lastLine.length
        lastLine += " ".repeat(trailSpace)
        res.add(lastLine)

        return res
    }
}
