class Solution {
    fun maxScore(cardPoints: IntArray, k: Int): Int {
        if (cardPoints.size == k) return cardPoints.sum()
        var l = cardPoints.size - k
        var r = cardPoints.lastIndex

        var maxScore = 0
        var currentScore = 0
        // the sum of the initial sub-array
        for (i in l..r) {
            maxScore += cardPoints[i]
            currentScore += cardPoints[i]
        }

        while (true) {
            currentScore -= cardPoints[l++ % cardPoints.size]
            currentScore += cardPoints[++r % cardPoints.size]
            maxScore = maxOf(maxScore, currentScore)
            if (l % cardPoints.size == 0) break
        }
        return maxScore
    }
}