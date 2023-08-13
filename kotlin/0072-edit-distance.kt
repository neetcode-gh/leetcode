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


/*
* DFS/Recursion + memoization Time O(m*n) and space O(n*m)
*/
class Solution {
    fun minDistance(word1: String, word2: String): Int {      

        val cache = Array(word1.length + 1) { IntArray(word2.length + 1){ Integer.MAX_VALUE } }

        fun dfs(i: Int, j: Int): Int {
            if (i == word1.length && j == word2.length) return 0
            else if (i == word1.length) return word2.length - j
            else if (j == word2.length) return word1.length - i

            if (cache[i][j] != Integer.MAX_VALUE) return cache[i][j]

            if (word1[i] == word2[j]) {
                cache[i][j] = dfs(i + 1, j + 1)
            } else {
                cache[i][j] = 1 + minOf(
                    dfs(i + 1, j),
                    dfs(i, j + 1),
                    dfs(i + 1, j + 1)
                )
            }

            return cache[i][j]
        }

        return dfs(0, 0)
    }
}
