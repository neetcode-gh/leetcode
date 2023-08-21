//DP
class Solution {
    fun wordBreak(s: String, wordDict: List<String>): Boolean {
        val cache = BooleanArray (s.length + 1).apply {
            this[s.length] = true 
        }
        
        for (i in s.lastIndex downTo 0) {
            for (word in wordDict) {
                if (word.length + i <= s.length) {
                    if (word == s.substring(i, i + word.length)) {
                        if (cache[i + word.length] == true) 
                            cache[i] = true
                    }
                }
            }
        }
        return cache[0]
    }
}

//Recursive + memoization
class Solution {
    fun wordBreak(s: String, wordDict: List<String>): Boolean {
        val cache = IntArray (s.length + 1) { -1 }
        
        fun dfs(i: Int): Int {
            if (i == s.length) return 1
            if (cache[i] != -1) return cache[i]

            cache[i] = 0

            for (word in wordDict) {
                if (word.length + i <= s.length && 
                    word == s.substring(i, i + word.length)) {
                    if (dfs(i + word.length) == 1) {
                        cache[i] = 1
                        return 1
                    }
                }
            }

            return 0
        }

        return if (dfs(0) == 1) true else false
    }
}
