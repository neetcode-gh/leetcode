class Solution {
    public int combinationSum4(int[] nums, int target) {
        Map<Integer, Integer> cache = new HashMap<>();

        cache.put(0, 1);

        for (int i = 1; i < target + 1; i++) {
            cache.put(i, 0);
            for (int n : nums) {
                int temp = cache.containsKey(i - n) ? cache.get(i - n) : 0;
                cache.put(i, cache.get(i) + temp);
            }
        }

        return cache.get(target);
    }
}