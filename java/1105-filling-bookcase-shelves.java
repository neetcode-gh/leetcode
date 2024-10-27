class Solution {
    public int minHeightShelves(int[][] books, int shelfWidth) {
        Map<Integer, Integer> cache = new HashMap<>();
        
        return helper(books, shelfWidth, 0, cache);
    }
    private int helper(int[][] books, int shelfWidth, int i, Map<Integer, Integer> cache) {
        if (i == books.length) {
            return 0;
        }
        if (cache.containsKey(i)) {
            return cache.get(i);
        }
        
        int curWidth = shelfWidth;
        int maxHeight = 0;
        int result = Integer.MAX_VALUE;
        
        for (int j = i; j < books.length; j++) {
            int width = books[j][0];
            int height = books[j][1];
            if (curWidth < width) {
                break;
            }
            curWidth -= width;
            maxHeight = Math.max(maxHeight, height);
            result = Math.min(result, helper(books, shelfWidth, j + 1, cache) + maxHeight);
        }
        
        cache.put(i, result);
        return result;
    }
}
