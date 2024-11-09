class Solution {
    public int bestTeamScore(int[] scores, int[] ages) {
        int[][] pairs = new int[scores.length][scores.length];
        for (int i = 0; i < scores.length; i++) {
            pairs[i] = new int[] { scores[i], ages[i] };
        }
        Arrays.sort(pairs, (a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);
        int[] dp = new int[pairs.length];
        for (int i = 0; i < pairs.length; i++) {
            dp[i] = pairs[i][0];
        }

        for (int i = 0; i < pairs.length; i++) {
            int maxScore = pairs[i][0];
            int maxAge = pairs[i][1];
            for (int j = 0; j < i; j++) {
                int score = pairs[j][0];
                int age = pairs[j][1];
                if (maxAge >= age) {
                    dp[i] = Math.max(dp[i], maxScore + dp[j]);
                }
            }
        }

        return Arrays.stream(dp).max().getAsInt();
    }
}
