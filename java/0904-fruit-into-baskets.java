class Solution {
    public int totalFruit(int[] fruits) {
        Map<Integer, Integer> fruitTypeToCount = new HashMap<>();
        int maxTotalFruits = 0;
        int l = 0;
        int r = 0;

        while (r < fruits.length) {
            fruitTypeToCount.put(fruits[r], fruitTypeToCount.getOrDefault(fruits[r], 0) + 1);

            while (fruitTypeToCount.size() > 2) {
                fruitTypeToCount.put(fruits[l], fruitTypeToCount.get(fruits[l]) - 1);
                if (fruitTypeToCount.get(fruits[l]) == 0) {
                    fruitTypeToCount.remove(fruits[l]);
                }
                l++;
            }

            maxTotalFruits = Math.max(maxTotalFruits, r - l + 1);
            r++;
        }

        return maxTotalFruits;
    }
}
