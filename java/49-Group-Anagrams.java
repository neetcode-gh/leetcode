class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> res = new ArrayList<>();
        if(strs.length==0) return res;
        HashMap<String, List<String>> map = new HashMap<>();
        for(String s: strs){
            char[] hash = new char[26];
            for(char c: s.toCharArray()){
                hash[c-'a']++;
            }
            String str=new String(hash);
            map.computeIfAbsent(str, k -> new ArrayList<>());
            map.get(str).add(s);
        }
        res.addAll(map.values());
        return res;
    }
}
