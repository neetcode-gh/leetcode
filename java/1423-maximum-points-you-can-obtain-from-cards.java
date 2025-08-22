class Solution {
    public int maxScore(int[] cardPoints, int k) {
        int total = 0;
        
        for (int i = cardPoints.length - k; i < cardPoints.length; i++) {
            total += cardPoints[i];
        }

        int res = total;

        for (int i = 0; i < k; i++) {
            total -= cardPoints[cardPoints.length - k + i];
            total += cardPoints[i];
            res = Math.max(res, total);
        }

        return res;
    }
}