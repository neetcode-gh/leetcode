class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> sol = new HashSet<>();
        int max = 0;
        int l = 0;
        for (int i = 0; i < s.length(); i++) {
            //for  every character in string do sliding window 
            while (sol.contains(s.charAt(i))) {
                // character is present, i.e.,duplicating remove char and move the left ptr
                sol.remove(s.charAt(l));
                l += 1;
            }
            sol.add(s.charAt(i));
            max = Math.max(max, i - l + 1);
        }
        return max;
    }
}
