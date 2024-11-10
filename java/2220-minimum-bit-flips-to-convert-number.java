class Solution {
    public int minBitFlips(int start, int goal) {
        int xorResult = start ^ goal;
        return Integer.bitCount(xorResult);
    }
}
