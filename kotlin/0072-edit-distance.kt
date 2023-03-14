class Solution {
    fun minDistance(word1: String, word2: String): Int {      

        val cache = Array(word1.length + 1) { 
            IntArray(word2.length + 1){ Integer.MAX_VALUE } 
        }

        for(j in 0..word2.length)
            cache[word1.length][j] = word2.length - j
        for(i in 0..word1.length)
            cache[i][word2.length] = word1.length - i

        for(i in word1.lastIndex downTo 0) {
            for(j in word2.lastIndex downTo 0) {
                if(word1[i] == word2[j]) {
                    cache[i][j] = cache[i + 1][j + 1]
                }else {
                    cache[i][j] = 1 + minOf(
                        cache[i + 1][j], 
                        cache[i][j + 1], 
                        cache[i + 1][j + 1]
                    )
                }
            }
        }

        return cache[0][0]
    }
}
