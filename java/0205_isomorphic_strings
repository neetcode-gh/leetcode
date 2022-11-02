class Solution {
    public boolean isIsomorphic(String s, String t) {
        HashMap mapST = new HashMap();
        HashMap mapTS = new HashMap(); 
        
        for(int i = 0; i < s.length(); i++) {
            char c1 = s.charAt(i);
            char c2 = t.charAt(i);
  
            if(mapST.containsKey(c1) && !mapST.get(c1).equals(c2) || mapTS.containsKey(c2) && !mapTS.get(c2).equals(c1)) {
                return false;
            }
            
            mapST.put(c1,c2);
            mapTS.put(c2,c1);
        }
        return true;
    }
}
