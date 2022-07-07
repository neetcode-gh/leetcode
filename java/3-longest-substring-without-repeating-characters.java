class Solution {
    public int lengthOfLongestSubstring(String s) {
        if (s == null || s.length() == 0)
            return 0;
        
        int start = 0, maxLen = 0;
        Set<Character> currentWindowSet = new HashSet<>();
        
        for (int end = 0 ; end < s.length() ; end++) {
            char currentChar = s.charAt(end);
            if (currentWindowSet.contains(currentChar)) {
                while (s.charAt(start) != currentChar) {
                    currentWindowSet.remove(s.charAt(start++));
                }
                start++;
            } else {
                currentWindowSet.add(currentChar);
                maxLen = Math.max(maxLen, currentWindowSet.size());
            }
        }
        
        return maxLen;
    }
}
