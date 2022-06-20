package leetcode;

public class ValidAnagram242 {
    public static void main(String[] args) {

       System.out.println(anagram1("anagram","nagaram"));
    }
    public static boolean anagram1(String s1 , String s2){

        if(s1.length() != s2.length()) return false;
        int[] res = new int[26];
        for(int i = 0 ; i<s1.length();i++){
            res[s1.charAt(i) - 'a']++;
            res[s2.charAt(i) - 'a']--;

        }
          for (int i=0;i<res.length;i++){
              if(res[i] != 0) return false;
          }
           return true;
    }

}
