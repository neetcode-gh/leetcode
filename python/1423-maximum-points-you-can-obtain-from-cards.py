class Solution:
    def maxScore(self, cardPoints: List[int], k: int) -> int:
        n = len(cardPoints)

        score = maxScore = sum(cardPoints[:k])

        for i in range(1, k + 1):
            score += cardPoints[-i] - cardPoints[k - i]
            maxScore = max(maxScore, score)

        return maxScore
