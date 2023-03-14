class Solution {
    fun wordPattern(pattern: String, s: String): Boolean {
        val wordArray = s.split(" ")
        if(wordArray.size != pattern.length) return false
        val hm = HashMap<Char, String>()
        pattern.forEachIndexed { i, c -> 
            when(hm.contains(c)){
                true -> if(hm[c] != wordArray[i]) return false
                false -> {
                    if(hm.containsValue(wordArray[i])) return false
                    hm[c] = wordArray[i]
                }
            }
        }
        return true
    }
}
