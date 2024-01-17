class Solution {
    public boolean makeEqual(String[] words) {
        Map<Character, Integer> map = new HashMap<>();

        for(String s: words){
            for(char c: s.toCharArray()){
                map.put(c, map.getOrDefault(c, 0) + 1);
            }
        }
        int n = words.length;
        for(char c: map.keySet()){
            if(map.get(c) % n != 0)
                return false;
        }
        return true;
    }
}
