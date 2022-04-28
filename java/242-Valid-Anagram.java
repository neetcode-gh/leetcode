class Solution {
    public boolean isAnagram(String s, String t) {
        Map<Character, Integer> sm = new HashMap<>();
        Map<Character, Integer> tm = new HashMap<>();

        for (int i = 0; i < s.length(); i++)
            sm.compute(s.charAt(i), (k, v) -> v == null ? 1 : v + 1);
        for (int i = 0; i < t.length(); i++)
            tm.compute(t.charAt(i), (k, v) -> v == null ? 1 : v + 1);

        return sm.equals(tm);
    }
}
