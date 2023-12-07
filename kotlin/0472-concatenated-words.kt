class Solution {
    fun findAllConcatenatedWordsInADict(words: Array<String>): List<String> {
        val wordSet = words.toSet()
        val dp = HashMap<String, Boolean>()

        fun dfs(word: String): Boolean {
            if (word in dp) return dp[word]!!
            for (i in 1 until word.length) {
                val prefix = word.substring(0, i)
                val suffix = word.substring(i, word.length)
                if ((prefix in wordSet && suffix in wordSet) || 
                    prefix in wordSet && dfs(suffix)) {
                        dp[word] = true
                        return true
                    }
                    
            }

            dp[word] = false
            return false
        }

        var res = mutableListOf<String>()
        for (word in words) {
            if (dfs(word))
                res.add(word)
        }

        return res
    }
}
