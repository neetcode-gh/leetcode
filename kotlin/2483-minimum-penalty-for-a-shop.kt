// Time O(n) and space O(n) with prefix/suffix sums
class Solution {
    fun bestClosingTime(c: String): Int {
        val n = c.length
        val prefix = IntArray (n + 1)
        val postfix = IntArray (n + 1)

        for (i in 1..n) {
            prefix[i] = prefix[i - 1] + if (c[i - 1] == 'N') 1 else 0
        }

        for (i in n - 1 downTo 0) {
            postfix[i] = postfix[i + 1] + if (c[i] == 'Y') 1 else 0
        }

        var res = Integer.MAX_VALUE
        var min = Integer.MAX_VALUE
        for (i in 0..n) {
            val pen = prefix[i] + postfix[i]
            if (pen < min) {
                min = pen
                res = i
            }
        }

        return res
    }
}

// Time O(n) and space O(1) with Kadane's Algorithm
class Solution {
    fun bestClosingTime(customers: String): Int {
        var cur = 0
        var max = 0
        var closeTime = 0

        for ((i, c) in customers.withIndex()) {
            cur += if(c == 'Y') 1 else -1
            if (cur > max) {
                max = cur
                closeTime = i + 1
            }
        }

        return closeTime
    }
}
