class Solution {
    public int bagOfTokensScore(int[] tokens, int power) {
        Arrays.sort(tokens);
        int res = 0;
        int score = 0;

        int l = 0;
        int r = tokens.length - 1;
        while (l <= r) {
            if (power >= tokens[l]) {
                power -= tokens[l++];
                score++;
                res = Math.max(res, score);
            } else if (score > 0) {
                power += tokens[r--];
                score--;
            } else {
                break;
            }
        }

        return res;
    }
}
