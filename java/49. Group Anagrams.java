class Solution {
    HashMap<String, List<String>> map = new HashMap<>();
    
    public List<List<String>> groupAnagrams(String[] strs) {
        
        for (int idx=0;idx<strs.length;idx++){
            process(strs[idx]);
        }
        
        return new ArrayList<List<String>>(map.values());
    }
    
    public void process(String data){
        int[] az= new int[26];
        
        for (int idx=0;idx<data.length();idx++){
            az[data.charAt(idx)-'a'] += 1;
        }
        StringBuilder result = new StringBuilder();
        for (int idx=0;idx<26;idx++){
            if (az[idx] == 0) continue;
            
            result.append(idx+"-"+az[idx]);
        }
        String out = result.toString();
        if (!map.containsKey(out)) map.put(out, new ArrayList());
        
        map.get(out).add(data);
    }
}
