class Solution {
    public int totalFruit(int[] fruits) {
        Map<Integer, Integer> fruitTypeToItsCount = new HashMap<>();
        int maxTotalFruits = 0;
        int l = 0;
        int r = 0;

        while (r < fruits.length) {
            fruitTypeToItsCount.put(fruits[r], fruitTypeToItsCount.getOrDefault(fruits[r], 0) + 1);

            while (fruitTypeToItsCount.size() > 2) {
                fruitTypeToItsCount.put(fruits[l], fruitTypeToItsCount.get(fruits[l]) - 1);
                if (fruitTypeToItsCount.get(fruits[l]) == 0) {
                    fruitTypeToItsCount.remove(fruits[l]);
                }
                l++;
            }

            maxTotalFruits = Math.max(maxTotalFruits, r - l + 1);
            r++;
        }

        return maxTotalFruits;
    }
}
