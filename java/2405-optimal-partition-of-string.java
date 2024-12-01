class Solution {
    public int partitionString(String s) {
        Set<Character> set = new HashSet<>();
        int res = 1;
        for (char ch : s.toCharArray()) {
            if (set.contains(ch)) {
                set = new HashSet<>();
                res++;
            }
            set.add(ch);
        }
        return res;
    }
}