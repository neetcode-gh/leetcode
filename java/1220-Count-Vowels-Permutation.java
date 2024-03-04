class Solution {
    // 0: 'a', 1: 'e', 2: 'i', 3: 'o', 4: 'u'

    private static int MOD = 1_000_000_000 + 7;
    
    private int getSum(long[] arr) {
        long sum = 0;
        for(long x: arr) {
            sum = sum + x;
            sum = sum % MOD;
        }
        return (int) sum;
    }
    
    private long[] getBaseCounts() {
        return new long[]{1, 1, 1, 1, 1};
    }
    
    private Map<Integer, List<Integer>> getNextCountMapping() {
        Map<Integer, List<Integer>> map = new HashMap<>();
        
        /*  0   1   2   3   4
            a   e   i   o   u
            
            Reverse mapping i.e. "depends on"
            {a: [e, i, u]}, {e: [a, i]}, {i: [e, o]}, 
            {o: [i]}, {u: [i, o]}
        */
        
        map.put(0, new ArrayList<>(List.of(1, 2, 4)));
        map.put(1, new ArrayList<>(List.of(0, 2)));
        map.put(2, new ArrayList<>(List.of(1, 3)));
        map.put(3, new ArrayList<>(List.of(2)));
        map.put(4, new ArrayList<>(List.of(2, 3)));
            
        return map;
    }
        
    private long[] getNextCounts(
        long[] currentCounts,
        Map<Integer, List<Integer>> mapNextCounting
    ) {
        long[] nextCounts = new long[5];
        Arrays.fill(nextCounts, 0);
        
        // Mapping conversion
        for(int key: mapNextCounting.keySet()) {
            for(int val: mapNextCounting.get(key)) {
                nextCounts[val] += (long) currentCounts[key];
                nextCounts[val] %= MOD;
            }
        }
        
        return nextCounts;
    }
    
    public int countVowelPermutation(int n) {
        long[] counts = getBaseCounts();
        if(n == 1) {
            return getSum(counts);
        }
        
        Map<Integer, List<Integer>> mapNextCounting;
        mapNextCounting = getNextCountMapping();
    
        for(int i=1; i<n; i++) {
            counts = getNextCounts(counts, mapNextCounting);
        }
        
        return getSum(counts);
    }
}
