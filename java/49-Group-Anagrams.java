class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> result = new ArrayList<>();
        Map<String, List<String>> map = new HashMap<>();
        for(int i = 0; i<strs.length; i++){//O(n)
            char[] chars = strs[i].toCharArray();
            Arrays.sort(chars);
            String str = new String(chars);
            if(!map.containsKey(str)){
                List<String> list = new ArrayList();
                map.put(str, list);
            }
            List<String> list = map.get(str);
            list.add(strs[i]);
        }
        for(Map.Entry<String, List<String>> entry : map.entrySet()){
            result.add(entry.getValue());
        }
        return result;
    }
}
