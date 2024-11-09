//dfs
class Solution {
    fun longestStrChain(words: Array<String>): Int {
        val wordList = words.toHashSet()
        val dp = HashMap<String, Int>()

        fun dfs(word: String, len: Int): Int {
            if (word !in wordList) return 0
            if ("$word:$len" in dp) return dp["$word:$len"]!!
            
            var res = len
            for (i in 0 until 26) {
                for (j in 0..word.length) {
                    val nextWord = word.substring(0, j) + ('a' + i) + word.substring(j, word.length) 
                    res = maxOf(res, dfs(nextWord, len + 1))
                }
            }

            dp["$word:$len"] = res
            return res        
        }

        var res = 1
        for (word in wordList) {
            res = maxOf(res, dfs(word, 1))
        }

        return res
    }
}

//dp
class Solution {
    fun longestStrChain(words: Array<String>): Int {
        words.sortBy { it.length }
        val dp = HashMap<String, Int>()

        var res = 0
        for (word in words) {
            var cur = 1
            for (i in 0 until word.length) {
                val nextWord = word.substring(0, i) + word.substring(i + 1)
                dp[nextWord]?.let {
                    cur = maxOf(cur, it + 1)
                }
            }

            dp[word] = cur
            res = maxOf(res, cur)
        }

        return res
    }
}
