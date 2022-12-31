class Solution {

    public List<String> findRepeatedDnaSequences(String s) {
        HashSet<String> set = new HashSet<>();
        int start = 0;
        HashSet<String> ans = new HashSet<>();
        for (int end = 10; end <= s.length(); end++) {
            if (set.contains(s.substring(start, end))) ans.add(
                s.substring(start, end)
            );
            set.add(s.substring(start, end));
            start++;
        }
        List<String> list = new ArrayList<>(ans);
        return list;
    }
}
