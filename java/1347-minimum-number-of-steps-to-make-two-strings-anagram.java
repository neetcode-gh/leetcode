/*-------------------------------
  Time Complexity: O(n)
  Space Complexity: O(n)
--------------------------------*/  
class Solution {
    public int minSteps(String s, String t) {
        Map<Character, Integer> map1 = new HashMap<>();
        for(char c: s.toCharArray())
            map1.put(c, map1.getOrDefault(c, 0) + 1);

        int res = 0;
        for(char c: t.toCharArray()){
            if(map1.containsKey(c) && map1.get(c) > 0){
                map1.put(c, map1.get(c)-1);
            }
            else{
                res++;
            }
        }    
        return res;
    }
}
