// Solution One
public class Solution {
    public int strStr(String haystack, String needle) {
        if (needle.isEmpty()) {
            return 0;
        }
        int[] lps = new int[needle.length()];

        int prevLPS = 0, i = 1;
        while (i < needle.length()) {
            if (needle.charAt(i) == needle.charAt(prevLPS)) {
                lps[i] = ++prevLPS;
                i++;
            } else {
                if (prevLPS == 0) {
                    lps[i] = 0;
                    i++;
                } else {
                    prevLPS = lps[prevLPS - 1];
                }
            }
        }

        int j = 0;  // ptr for needle
        for (i = 0; i < haystack.length(); ) {
            if (haystack.charAt(i) == needle.charAt(j)) {
                i++;
                j++;
            } else {
                if (j == 0) {
                    i++;
                } else {
                    j = lps[j - 1];
                }
            }
            if (j == needle.length()) {
                return i - j;
            }
        }
        return -1;
    }
}

// Solution Two (Linear search using indexOf method for arrays)
class Solution {
    public int strStr(String haystack, String needle) {
        int result = 0;
        if (haystack.length() <= 0 && needle.length() > 0) return -1;
        if (haystack.length() != 0) {
            int occurence = haystack.indexOf(needle);
            if (occurence == -1) 
                return occurence;
            result = occurence;
        }
        return result;
    }
}
