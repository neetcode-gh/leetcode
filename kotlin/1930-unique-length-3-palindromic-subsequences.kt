/*
* Time complexity 0(N * 26) ~ O(N)
*
* Space complexity O(26 + 26 + 26*26) or 0(A^2) where A is the alphabet which technically is O(1) 
*/
class Solution {
    fun countPalindromicSubsequence(s: String): Int {

        val left = HashSet<Char>()
        val right = IntArray(26)
        var res = HashSet<Pair<Char, Char>>() // inner to outer pair, where they form the palindrome outer-inner-outer

        for(c in s) right[c - 'a']++

        for(i in s.indices) {
            if(right[s[i] - 'a'] > 0 ) right[s[i] - 'a']--
            for(j in 0 until 26) {
                val c = 'a'.plus(j)
                if(c in left && right[c - 'a'] > 0) {
                    res.add(s[i] to c)
                }
            }
            left.add(s[i])
        }

        return res.size
    }
}

/*
* Time complexity 0(26*N+N*M) where M is the length of the substring between first and last character ~O(N*M)
* I see many posts claiming O(N) for the time complexity of this algorithm, but for Java/Kotlin, time complexity should be O(M*N)
* since according to https://stackoverflow.com/questions/4679746/time-complexity-of-javas-substring , substring() time complexity is Linear.
*
* Space complexity O(2*26) ~O(1)
*/
class Solution {
    fun countPalindromicSubsequence(s: String): Int {

        val first = IntArray(26) {Integer.MAX_VALUE}
        val second = IntArray(26)
        var res = 0

        for(i in s.indices) {
            first[s[i] - 'a'] = minOf(first[s[i] - 'a'], i)
            second[s[i] - 'a'] = i
        }

        for(i in 0 until 26) {
            if(first[i] < second[i]) 
                res += s.substring(first[i]+1, second[i]).toCharArray().distinct().count()
        }

        return res
    }
}
