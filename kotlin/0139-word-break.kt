class Solution {
    fun wordBreak(s: String, wordDict: List<String>): Boolean {
        val cache = BooleanArray(s.length+1)
        cache[s.length] = true // lastPos is true, meaning [array of word length], lastPos] since string "" can be segmented of any list of any words (our dp basecase)
        for(i in s.length-1 downTo 0){
            for(word in wordDict){
                if(word.length+i <= s.length){//enough chars in s for this word to be viable ?
                    if(word == s.substring(i, i+word.length)){// its the same word char by char?
                        if(cache[i+word.length] == true) //this cache index is true only if the cache at index [i+word.length is true]
                            cache[i] = true
                    }
                }
            }
        }
        return cache[0]
    }
}
