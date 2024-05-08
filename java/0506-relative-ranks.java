class Solution {
    public String[] findRelativeRanks(int[] score) {
        int S = score.length;
        int[][] sortedScore = new int[S][2];
        for (int i = 0; i < S; i++)
        {
            sortedScore[i] = new int[] {score[i], i};
        }
        Arrays.sort(sortedScore, (a,b) -> b[0] - a[0]);
        String[] medals = {"Gold Medal", "Silver Medal", "Bronze Medal"};
        String[] result = new String[S];
        for (int i = 0; i < S; i++)
        {
            if ( i <= 2)
                result[sortedScore[i][1]] = medals[i];
            else
                result[sortedScore[i][1]] = Integer.toString(i+1);
        }
        return result;
    }
}