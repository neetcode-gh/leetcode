class Solution {
    public int minDeletions(String s) {
        // This Map stores the frequency of characters in String s.
        HashMap<Character, Integer> map = new HashMap<>();
        for(char c: s.toCharArray()){
            map.put(c, map.getOrDefault(c, 0) + 1);
        }
        // This set stores the frequency of Characters that we encounter 
        HashSet<Integer> set = new HashSet<>();
        int res = 0;
        for (char c: map.keySet()){
            while (map.get(c) > 0 && set.contains(map.get(c))){
                map.put(c, map.get(c)-1);
                res++;
            }
            set.add(map.get(c));
        }
        return res;
    }
}
