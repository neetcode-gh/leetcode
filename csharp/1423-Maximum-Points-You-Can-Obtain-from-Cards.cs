public class Solution {
    public int MaxScore(int[] cardPoints, int k) {
     if (k > cardPoints.Length)
            {
                return cardPoints.Sum();
            }
            int res = 0, total = 0;
            int l = 0, r = cardPoints.Length - k;
            for (int i = r; i < cardPoints.Length; i++)
                total += cardPoints[i];
            res = total;
            while (r < cardPoints.Length)
            {
                total += cardPoints[l] - cardPoints[r];
                res = Math.Max(res, total);
                l++;
                r++;
            }
            return res;
    }
}
