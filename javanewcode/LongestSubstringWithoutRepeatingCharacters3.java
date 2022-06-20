package leetcode;

import java.util.HashSet;
import java.util.Set;

public class LongestSubstringWithoutRepeatingCharacters3 {
    public static void main(String[] args) {
              String s = "abcabcbb";
        System.out.println(longestSubstring(s));
    }
    public static int longestSubstring(String s){
        Set<Character> set = new HashSet<>();
        int i = 0 , j = 0, maxLen = 0;
        while (j<s.length()){
            if(!set.contains(s.charAt(j))){
                set.add(s.charAt(j));
                maxLen = Integer.max(maxLen,set.size());
                j++;
            }else{
                set.remove(s.charAt(i));
                i++;
            }
        }
         return maxLen;
    }
}
