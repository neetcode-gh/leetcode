class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        
        HashMap<Integer, Integer> occurance = new HashMap<Integer, Integer>();
//      Val, Occurance
        
        int l = nums.length;
        List<Integer>[] vals = new List[l+1];
        List<Integer> solList = new ArrayList<>();
        
        for (int n : nums) {
            occurance.put(n, occurance.getOrDefault(n, 0) + 1);
        }
        
        for (int key : occurance.keySet()) {
            int freq = occurance.get(key);
            if (vals[freq] == null) {
                vals[freq] = new ArrayList<>();
            }
            vals[freq].add(key);
        }
        
        for (int pos = vals.length - 1; pos >= 0 && solList.size() < k; pos--) {
            if (vals[pos] != null) {
                solList.addAll(vals[pos]);
            }
        }
        
        int[] sol = new int[k];
        for (int i=0; i<solList.size(); i++) {
            sol[i] = solList.get(i);
        }
        
        return sol;
        
        
    }
}
