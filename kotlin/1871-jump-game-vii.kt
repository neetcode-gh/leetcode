/*
* O(n) BFS
*/
class Solution {
    fun canReach(s: String, minJump: Int, maxJump: Int): Boolean {
        val q = LinkedList<Int>().apply { add(0) }
        var farthest = 0

        with (q) {
            while (isNotEmpty()) {
                val i = removeFirst()
                val start = maxOf(i + minJump, farthest + 1)

                for (j in start until minOf(i + maxJump + 1, s.length)) {
                    if (s[j] == '0') {
                        if (j == s.lastIndex)
                            return true
                        addLast(j)
                    }
                }

                farthest = i + maxJump
            }
        }

        return false
    }
}

/*
* O(n) DP
*/
class Solution {
    fun canReach(s: String, minJump: Int, maxJump: Int): Boolean {
        val dp = BooleanArray(s.length).apply { this[0] = true }

        var cntOfPos = 0
        for (i in 1 until s.length) {
            if (i - minJump >= 0 && dp[i - minJump]) 
                cntOfPos++
            if (i - maxJump > 0 && dp[i - maxJump - 1])
                cntOfPos--
            dp[i] = cntOfPos > 0 && s[i] == '0'
        }

        return dp[s.lastIndex]
    }
}
