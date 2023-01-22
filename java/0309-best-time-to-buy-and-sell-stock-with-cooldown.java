class Solution {

    public int maxProfit(int[] prices) {
        Map<String, Integer> cache = new HashMap<>();
        return dfs(prices, cache, 0, true);
    }

    public int dfs(
        int[] prices,
        Map<String, Integer> cache,
        int index,
        boolean buying
    ) {
        if (index >= prices.length) {
            return 0;
        }
        String key = index + "-" + buying;

        if (cache.containsKey(key)) {
            return cache.get(key);
        }

        int cooldown = dfs(prices, cache, index + 1, buying);
        int buyOsell = Integer.MIN_VALUE;

        if (buying) {
            buyOsell = dfs(prices, cache, index + 1, !buying) - prices[index];
        } else {
            buyOsell = dfs(prices, cache, index + 2, !buying) + prices[index];
        }

        cache.put(key, Math.max(buyOsell, cooldown));
        return cache.get(key);
    }
}
