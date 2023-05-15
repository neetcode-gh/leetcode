/*
* DP Time O(m*n) and space O(m*n)
*/
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

/*
* DP Time O(m*n) and optimized space O(n)
*/
class Solution {
    fun minDistance(word1: String, word2: String): Int { 
        val m = word1.length
        val n = word2.length    
        var prev = IntArray(n + 1) { it }

        for (i in 1..m) {
            val new = IntArray(n + 1)
            new[0] = i
            for (j in 1..n) {
                if (word1[i - 1] == word2[j - 1]) {
                    new[j] = prev[j - 1]
                } else {
                    new[j] = 1 + minOf(
                        prev[j], 
                        prev[j - 1], 
                        new[j - 1]
                    )
                }
            }
            prev = new
        }
     
        return prev[n]
    }
}
