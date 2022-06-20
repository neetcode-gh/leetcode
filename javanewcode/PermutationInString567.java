package leetcode;

public class PermutationInString567 {
    public static void main(String[] args) {
        System.out.println(permutation("ab","eidboaoo"));
    }
    public static boolean permutation(String s1 , String s2){
        int[] map = new int[26];
        for(char c : s1.toCharArray()) map[c - 'a']++;
        int j = 0, i = 0;
        int count_chars = s1.length();
        while(j < s2.length()){
            if(map[s2.charAt(j++) - 'a']-- > 0)
                count_chars--;
            if(count_chars == 0) return true;
            if(j - i == s1.length() && map[s2.charAt(i++) - 'a']++ >= 0)
                count_chars++;
        }
        return false;
    }
}
