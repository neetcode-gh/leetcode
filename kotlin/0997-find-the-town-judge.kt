class Solution {
    fun findJudge(n: Int, trust: Array<IntArray>): Int {
        val delta = IntArray (n + 1)

        for ((src, dst) in trust) {
           delta[dst]++
           delta[src]--
        }

        for (i in 1..n) {
            if (delta[i] == n - 1)
                return i
        }

        return -1
    }
}
