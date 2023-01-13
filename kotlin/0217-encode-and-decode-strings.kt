class Codec {
    // Encodes a list of strings to a single string.
    fun encode(strs: List<String>): String {
        var res = ""
        strs.forEach{
            res = res + it.length + "#" + it
        }
        return res
    }
    
    // Decodes a single string to a list of strings.
    fun decode(s: String): List<String> {
        var (res, i) = Pair(mutableListOf<String>(), 0)
        
        while (i < s.length){
            var j = i
            while (s[j] != '#') {
                j++
            }
            val lengthOfWord = s.subSequence(i, j).toString().toInt()
            
            val (wordStart, wordEnd) = Pair(j+1, j+1+lengthOfWord)
            res.add(s.subSequence(wordStart, wordEnd).toString())

            i = wordEnd

        }
        return res
        
    }
}

/**
 * Your Codec object will be instantiated and called as such:
 * var obj = Codec()
 * val s = obj.encode(strs)
 * val ans = obj.decode(s)
 */