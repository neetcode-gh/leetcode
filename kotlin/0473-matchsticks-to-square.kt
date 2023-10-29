class Solution {
    fun makesquare(matchsticks: IntArray): Boolean {
        val length = matchsticks.sum()!! / 4
        val sides = IntArray (4)

        if (matchsticks.sum()!! / 4 != length) return false

        matchsticks.sortDescending()

        fun backtrack(i: Int): Boolean {
            if (i == matchsticks.size) return true

            for (j in 0..3) {
                if (sides[j] + matchsticks[i] <= length) {
                    sides[j] += matchsticks[i]
                    if (backtrack(i + 1))
                        return true
                    sides[j] -= matchsticks[i]
                }
            }

            return false
        }

        return backtrack(0)
    }
}
