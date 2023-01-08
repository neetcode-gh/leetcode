class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        int empty = flowerbed[0] == 0 ? 1 : 0;

        for (int i : flowerbed) {
            if (i == 1) {
                n -= (empty - 1) / 2;
                empty = 0;
            } else {
                empty += 1;
            }
        }

        n -= empty / 2;
        return n <= 0;
    }
}