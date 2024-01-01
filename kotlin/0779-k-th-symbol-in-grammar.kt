class Solution {
    fun kthGrammar(n: Int, k: Int): Int {
        var cur = 0
        var left = 1
        var right = 2.0.pow(n - 1).toInt()

        repeat (n - 1) {
            val mid = (left + right) / 2
            if (k <= mid) {
                right = mid
            } else {
                left = mid + 1
                cur = if (cur == 1) 0 else 1
            }
        }

        return cur
    }
}

// another solution using the same thought but different way of coding it
class Solution {
    fun kthGrammar(n: Int, k: Int): Int {
        if (n == 1) return 0
        if (k % 2 == 0) return if (kthGrammar(n - 1,  k / 2) == 0) 1 else 0
        else return if (kthGrammar(n - 1, (k + 1) / 2) == 0) 0 else 1
    }
}

// another solution, recommend reading https://leetcode.com/problems/k-th-symbol-in-grammar/solutions/113705/java-one-line/ for explanation
class Solution {
    fun kthGrammar(n: Int, k: Int) = Integer.bitCount(k - 1) and 1
}
