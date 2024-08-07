class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int low = 1, high = 0;
        for (int x : piles) {
            high = Math.max(x, high);
        }
        while (low < high) {
            int k = low + ((high - low) / 2);
            if (eatBananas(piles, h, k)) {
                high = k;
            }
            else {
                low = k + 1;
            }
        }
        return low;
    }

    public boolean eatBananas(int[] piles, int h, int k) {
        for (int i = 0; i < piles.length; i++) {
            h -= Math.ceil((double)piles[i] / k);
        }
        return h >= 0;
    }
}