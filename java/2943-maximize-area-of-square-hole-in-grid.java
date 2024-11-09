class Solution {
    public int maximizeSquareHoleArea(int n, int m, int[] hBars, int[] vBars) {
        Arrays.sort(hBars);
        Arrays.sort(vBars);

        int maxH = getMaxConsecutiveLength(hBars);
        int maxV = getMaxConsecutiveLength(vBars);
        int sqrlen = Math.min(maxH + 1, maxV + 1);

        return sqrlen*sqrlen;
    }
    private int getMaxConsecutiveLength(int[] arr) {
        int maxLen = 0;
        int currentLen = 1;

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] == arr[i - 1] + 1) {
                currentLen++;
            } else {
                maxLen = Math.max(maxLen, currentLen);
                currentLen = 1;
            }
        }
        maxLen = Math.max(maxLen, currentLen);
        return maxLen;
    }
}
