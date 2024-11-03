class Solution {
    Map<String, Integer> cache;
   
    public int getLengthOfOptimalCompression(String s, int k) {
        cache = new HashMap<>();
        return count(0, k, '\0', 0, s);
    }
    private int count(int i, int k, char prev, int prev_count, String s){
        String curr_state = i + "," + k + "," + prev + "," + prev_count;

        if(cache.containsKey(curr_state))
            return cache.get(curr_state);
        if(k < 0)
            return Integer.MAX_VALUE;
        if(i == s.length())
            return 0;

        int res = -1;    
        if(s.charAt(i) == prev){
            int incr = (prev_count == 1 || prev_count == 9 || prev_count == 99)? 1: 0;
            res = incr + count(i + 1, k, prev, prev_count + 1, s);
        }
        else{
            res = Math.min(count(i + 1, k - 1, prev, prev_count, s), 
                            1 + count(i + 1, k, s.charAt(i), 1, s));
        }
        cache.put(curr_state, res);
        return res;             
    }
}
