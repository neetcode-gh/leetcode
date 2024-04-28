class Solution {
    fun bagOfTokensScore(tokens: IntArray, power: Int): Int {
        tokens.sort()

        var res = 0
        var score = 0
        var power = power

        var left = 0
        var right = tokens.lastIndex
        while (left <= right) {
            if (power >= tokens[left]) {
                power -= tokens[left++]
                score++
                res = maxOf(res, score)
            } else if (score > 0) {
                power += tokens[right--]
                score--
            } else {
                break
            }
        }

        return res
    }
}
