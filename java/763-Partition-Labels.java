class Solution {
    public List<Integer> partitionLabels(String s) {
        List<Integer> list = new ArrayList<>();
        HashMap<Character, Integer> map = new HashMap<>();
        for (int i = 0; i<s.length(); i++) {
            map.put(s.charAt(i), i);
        }
        int j = 0;
        int i = 0;
        while (i<s.length()) {
            int count = 0;
            j = Math.max(j, map.get(s.charAt(i)));
            while (i<=j) {
                j = Math.max(j, map.get(s.charAt(i)));    
                i++;
                count++;
            }
            list.add(count);
        }
        return list;
        
    }
}
