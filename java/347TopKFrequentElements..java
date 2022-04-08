class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        //hashmap, check count == k, add to result
        //List<Integer> result = new ArrayList();
        HashMap<Integer, Integer> map = new HashMap();
        //int max = 0;
        
        for (int idx=0;idx<nums.length;idx++){
            int num = nums[idx];
            
            map.put(num, map.getOrDefault(num,0)+1);
            
            //max = Math.max(max, map.get(num));
        }
        List<Integer> set = new ArrayList<Integer>(map.keySet());
        List<Integer>[] out = new List[nums.length+1];
        
        for (int idx=0;idx<set.size();idx++){
            int count = map.get(set.get(idx));
            
            //if (count )
            if (out[count] == null)out[count] = new ArrayList<Integer>();
            
            out[count].add(set.get(idx));
        }
        
        int[] result = new int[k];
        int i=0;
        for (int idx=out.length-1;i<k;idx--) {
            if (out[idx] == null) continue;
        
            for (Integer temp : out[idx]){
                if (i>=k) break;
                
                result[i++]= temp;
            }
        }
        return result;
    }
}
