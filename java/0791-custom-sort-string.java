class Solution {
    public String customSortString(String order, String s) {
        Map<Character, Integer> map = new HashMap<>();
        for(char c: s.toCharArray())
            map.put(c, map.getOrDefault(c, 0) + 1);

        StringBuilder res = new StringBuilder();
        for(char c: order.toCharArray()){
            while(map.containsKey(c) && map.get(c) > 0){
                res.append(c);
                map.put(c, map.get(c)-1);
            }
        }
        for(char c: map.keySet()){
            while(map.get(c) > 0){
                res.append(c);
                map.put(c, map.get(c)-1);
            }
        }
        return res.toString();       
    }
}
